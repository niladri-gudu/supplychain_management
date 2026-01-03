// SPDX-License-Identifier: None
pragma solidity ^0.8.20;

contract SupplyChainEscrow {
    enum Status {
        Pending,
        InTransit,
        Delivered
    }

    struct Shipment {
        uint256 id;
        address buyer;
        address seller;
        uint256 amount;
        Status status;
        uint256 createdAt;
    }

    uint256 public shipmentCount;

    mapping (uint256 => Shipment) public shipments;
    mapping (address => uint256[]) private userShipments;

    event ShipmentCreated(uint256 indexed id, address indexed buyer, address indexed seller, uint256 amount);

    event StatusUpdated(uint256 indexed id, Status status);
    event FundsReleased(uint256 indexed id, address seller, uint256 amount);

    function createShipment(address seller) external payable {
        require(msg.value > 0, "Escrow amount required");
        require(seller != address(0), "Invalid seller!");

        shipmentCount++;

        shipments[shipmentCount] = Shipment({
            id: shipmentCount,
            buyer: msg.sender,
            seller: seller,
            amount: msg.value,
            status: Status.Pending,
            createdAt: block.timestamp
        });

        userShipments[msg.sender].push(shipmentCount);
        userShipments[seller].push(shipmentCount);
        
        emit ShipmentCreated(shipmentCount, msg.sender, seller, msg.value);
    }

    function updateStatus(uint256 shipmentId, Status newStatus) external {
        Shipment storage shipment = shipments[shipmentId];

        require(shipmentId != 0, "Shipment not found!");
        require(msg.sender == shipment.buyer || msg.sender == shipment.seller, "Not authorized");

        require(uint256(newStatus) == uint256(shipment.status) + 1, "Invalid status transition");

        shipment.status = newStatus;

        emit StatusUpdated(shipmentId, newStatus);

        if (newStatus == Status.Delivered) {
            _releaseFunds(shipmentId);
        }
    }

    function _releaseFunds(uint256 shipmentId) internal {
        Shipment storage shipment = shipments[shipmentId];
        uint256 amount = shipment.amount;

        shipment.amount = 0;

        (bool success, ) = shipment.seller.call{value: amount}("");
        require(success, "ETH transfer failed");

        emit FundsReleased(shipmentId, shipment.seller, amount);
    }

    function getShipment(uint256 shipmentId) external view returns (Shipment memory) {
        return shipments[shipmentId];
    }

    function getUserShipments(address user) external view returns (uint256[] memory) {
        return userShipments[user];
    }

    function getAllShipments() external view returns (Shipment[] memory) {
        Shipment[] memory all = new Shipment[](shipmentCount);

        for (uint256 i = 1 ; i <= shipmentCount ; i++) {
            all[i - 1] = shipments[i];
        }

        return all;
    }

}