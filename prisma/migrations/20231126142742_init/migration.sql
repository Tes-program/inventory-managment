-- CreateTable
CREATE TABLE `Supplier` (
    `SupplierID` INTEGER NOT NULL AUTO_INCREMENT,
    `SupplierName` VARCHAR(191) NOT NULL,
    `ContactInfo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`SupplierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `ProductID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `Price` DOUBLE NOT NULL,
    `ExpirationDate` DATETIME(3) NOT NULL,
    `ShelfLife` INTEGER NOT NULL,
    `StockQuantity` INTEGER NOT NULL,
    `SupplierID` INTEGER NOT NULL,

    PRIMARY KEY (`ProductID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `CustomerID` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `ContactInfo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`CustomerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `OrderID` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomerID` INTEGER NOT NULL,
    `OrderDate` DATETIME(3) NOT NULL,
    `TotalAmount` DOUBLE NOT NULL,

    PRIMARY KEY (`OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `OrderItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `UnitPrice` DOUBLE NOT NULL,
    `Subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`OrderItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReturnTransaction` (
    `ReturnID` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderID` INTEGER NOT NULL,
    `ReturnDate` DATETIME(3) NOT NULL,
    `Reason` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ReturnID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefundTransaction` (
    `RefundID` INTEGER NOT NULL AUTO_INCREMENT,
    `ReturnID` INTEGER NOT NULL,
    `RefundAmount` DOUBLE NOT NULL,
    `RefundDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`RefundID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryTransaction` (
    `TransactionID` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductID` INTEGER NOT NULL,
    `TransactionDate` DATETIME(3) NOT NULL,
    `TransactionType` ENUM('Purchase', 'Return', 'Delivery', 'Sale', 'None') NOT NULL DEFAULT 'Sale',
    `QuantityChange` INTEGER NOT NULL,

    PRIMARY KEY (`TransactionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SupplierTransaction` (
    `SupplierTransactionID` INTEGER NOT NULL AUTO_INCREMENT,
    `SupplierID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `TransactionDate` DATETIME(3) NOT NULL,
    `TransactionType` ENUM('Purchase', 'Return', 'Delivery', 'Sale', 'None') NOT NULL DEFAULT 'None',
    `QuantityChange` INTEGER NOT NULL,

    PRIMARY KEY (`SupplierTransactionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PriceAdjustment` (
    `AdjustmentID` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductID` INTEGER NOT NULL,
    `OldPrice` DOUBLE NOT NULL,
    `NewPrice` DOUBLE NOT NULL,
    `AdjustmentDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`AdjustmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockAdjustment` (
    `AdjustmentID` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductID` INTEGER NOT NULL,
    `OldQuantity` INTEGER NOT NULL,
    `NewQuantity` INTEGER NOT NULL,
    `AdjustmentDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`AdjustmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionHistory` (
    `TransactionID` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductID` INTEGER NOT NULL,
    `TransactionDate` DATETIME(3) NOT NULL,
    `TransactionType` VARCHAR(191) NOT NULL,
    `QuantityChange` INTEGER NOT NULL,

    PRIMARY KEY (`TransactionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_UserName_key`(`UserName`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_SupplierID_fkey` FOREIGN KEY (`SupplierID`) REFERENCES `Supplier`(`SupplierID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_CustomerID_fkey` FOREIGN KEY (`CustomerID`) REFERENCES `Customer`(`CustomerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `Order`(`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReturnTransaction` ADD CONSTRAINT `ReturnTransaction_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `Order`(`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefundTransaction` ADD CONSTRAINT `RefundTransaction_ReturnID_fkey` FOREIGN KEY (`ReturnID`) REFERENCES `ReturnTransaction`(`ReturnID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryTransaction` ADD CONSTRAINT `InventoryTransaction_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierTransaction` ADD CONSTRAINT `SupplierTransaction_SupplierID_fkey` FOREIGN KEY (`SupplierID`) REFERENCES `Supplier`(`SupplierID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SupplierTransaction` ADD CONSTRAINT `SupplierTransaction_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PriceAdjustment` ADD CONSTRAINT `PriceAdjustment_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockAdjustment` ADD CONSTRAINT `StockAdjustment_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHistory` ADD CONSTRAINT `TransactionHistory_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Product`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;
