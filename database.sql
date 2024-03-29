-- MySQL Script generated by MySQL Workbench
-- Wed Jun  2 22:12:21 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema OnlineStore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema OnlineStore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `OnlineStore` DEFAULT CHARACTER SET utf8 ;
USE `OnlineStore` ;

-- -----------------------------------------------------
-- Table `OnlineStore`.`Категории`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Категории` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Категории` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Наименование` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idcategories_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Наименование_UNIQUE` (`Наименование` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Производители`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Производители` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Производители` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Наименование` VARCHAR(100) NOT NULL,
  `Описание` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idПроизводитель_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Наименование_UNIQUE` (`Наименование` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Товары`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Товары` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Товары` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Наименование` VARCHAR(100) NOT NULL,
  `Цена` DECIMAL(10,2) NOT NULL,
  `Описание` VARCHAR(500) NULL,
  `КоличествоНаСкладе` INT NOT NULL,
  `Категории_id` INT NOT NULL,
  `Производитель_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idТовары_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Товары_Категории_idx` (`Категории_id` ASC) VISIBLE,
  INDEX `fk_Товары_Производитель1_idx` (`Производитель_id` ASC) VISIBLE,
  CONSTRAINT `fk_Товары_Категории`
    FOREIGN KEY (`Категории_id`)
    REFERENCES `OnlineStore`.`Категории` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Товары_Производитель1`
    FOREIGN KEY (`Производитель_id`)
    REFERENCES `OnlineStore`.`Производители` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Поставщики`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Поставщики` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Поставщики` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Наименование` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Сотрудники`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Сотрудники` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Сотрудники` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Имя` VARCHAR(100) NOT NULL,
  `Отчество` VARCHAR(100) NULL,
  `Фамилия` VARCHAR(100) NOT NULL,
  `Телефон` VARCHAR(12) NULL,
  `Email` VARCHAR(100) NULL,
  `Login` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NULL,
  `Действителен` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Login_UNIQUE` (`Login` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Поставки`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Поставки` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Поставки` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Дата` DATETIME NOT NULL,
  `Поставщики_id` INT NOT NULL,
  `Сотрудники_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Поставки_Поставщики1_idx` (`Поставщики_id` ASC) VISIBLE,
  INDEX `fk_Поставки_Сотрудники1_idx` (`Сотрудники_id` ASC) VISIBLE,
  CONSTRAINT `fk_Поставки_Поставщики1`
    FOREIGN KEY (`Поставщики_id`)
    REFERENCES `OnlineStore`.`Поставщики` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Поставки_Сотрудники1`
    FOREIGN KEY (`Сотрудники_id`)
    REFERENCES `OnlineStore`.`Сотрудники` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Клиенты`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Клиенты` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Клиенты` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Имя` VARCHAR(100) NOT NULL,
  `Отчество` VARCHAR(100) NULL,
  `Фамилия` VARCHAR(100) NOT NULL,
  `Телефон` VARCHAR(12) NULL,
  `Email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Сделки`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Сделки` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Сделки` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Клиенты_id` INT NOT NULL,
  `Сотрудники_id` INT NOT NULL,
  `Стоимость_сделки` DECIMAL(10,2) NOT NULL,
  `Дата` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Сделки_Клиенты1_idx` (`Клиенты_id` ASC) VISIBLE,
  INDEX `fk_Сделки_Сотрудники1_idx` (`Сотрудники_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_Сделки_Клиенты1`
    FOREIGN KEY (`Клиенты_id`)
    REFERENCES `OnlineStore`.`Клиенты` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Сделки_Сотрудники1`
    FOREIGN KEY (`Сотрудники_id`)
    REFERENCES `OnlineStore`.`Сотрудники` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Чек`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Чек` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Чек` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Сумма` DECIMAL(10,2) NOT NULL,
  `Дата` DATETIME NOT NULL,
  `Сделки_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Чек_Сделки1_idx` (`Сделки_id` ASC) VISIBLE,
  CONSTRAINT `fk_Чек_Сделки1`
    FOREIGN KEY (`Сделки_id`)
    REFERENCES `OnlineStore`.`Сделки` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Должности`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Должности` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Должности` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Наименование` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Наименование_UNIQUE` (`Наименование` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Должности_Сотрудники`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Должности_Сотрудники` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Должности_Сотрудники` (
  `Должности_id` INT NOT NULL,
  `Сотрудники_id` INT NOT NULL,
  INDEX `fk_Должности_Сотрудники_Должност_idx` (`Должности_id` ASC) VISIBLE,
  INDEX `fk_Должности_Сотрудники_Сотрудни_idx` (`Сотрудники_id` ASC) VISIBLE,
  PRIMARY KEY (`Должности_id`, `Сотрудники_id`),
  CONSTRAINT `fk_Должности_Сотрудники_Должности1`
    FOREIGN KEY (`Должности_id`)
    REFERENCES `OnlineStore`.`Должности` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Должности_Сотрудники_Сотрудник1`
    FOREIGN KEY (`Сотрудники_id`)
    REFERENCES `OnlineStore`.`Сотрудники` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Поставки_Товары`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Поставки_Товары` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Поставки_Товары` (
  `Штука_Стоимость` DECIMAL(10,2) NOT NULL,
  `КоличествоТовара` INT NOT NULL,
  `Поставка_id` INT NOT NULL,
  `Товар_id` INT NOT NULL,
  INDEX `fk_Поставки_Товары_Поставки1_idx` (`Поставка_id` ASC) VISIBLE,
  PRIMARY KEY (`Поставка_id`, `Товар_id`),
  INDEX `fk_Поставки_Товары_Товары1_idx` (`Товар_id` ASC) VISIBLE,
  CONSTRAINT `fk_Поставки_Товары_Поставки1`
    FOREIGN KEY (`Поставка_id`)
    REFERENCES `OnlineStore`.`Поставки` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Поставки_Товары_Товары1`
    FOREIGN KEY (`Товар_id`)
    REFERENCES `OnlineStore`.`Товары` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Сделки_Товары`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Сделки_Товары` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Сделки_Товары` (
  `Сделки_id` INT NOT NULL AUTO_INCREMENT,
  `Товары_id` INT NOT NULL,
  `КоличествоТовара` INT NOT NULL,
  `Штука_Стоимость` INT NOT NULL,
  INDEX `fk_Сделки_has_Товары_Сделки1_idx` (`Сделки_id` ASC) VISIBLE,
  INDEX `fk_Сделки_has_Товары_Товары1_idx` (`Товары_id` ASC) VISIBLE,
  PRIMARY KEY (`Сделки_id`, `Товары_id`),
  CONSTRAINT `fk_Сделки_has_Товары_Сделки1`
    FOREIGN KEY (`Сделки_id`)
    REFERENCES `OnlineStore`.`Сделки` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Сделки_has_Товары_Товары1`
    FOREIGN KEY (`Товары_id`)
    REFERENCES `OnlineStore`.`Товары` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OnlineStore`.`Доставки`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OnlineStore`.`Доставки` ;

CREATE TABLE IF NOT EXISTS `OnlineStore`.`Доставки` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Дата` DATE NULL,
  `Адрес` VARCHAR(500) NOT NULL,
  `Доставлено` TINYINT NOT NULL,
  `Сотрудники_id_курьер` INT NOT NULL,
  `Сделки_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Доставки_Сотрудники1_idx` (`Сотрудники_id_курьер` ASC) VISIBLE,
  INDEX `fk_Доставки_Сделки1_idx` (`Сделки_id` ASC) VISIBLE,
  CONSTRAINT `fk_Доставки_Сотрудники1`
    FOREIGN KEY (`Сотрудники_id_курьер`)
    REFERENCES `OnlineStore`.`Сотрудники` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Доставки_Сделки1`
    FOREIGN KEY (`Сделки_id`)
    REFERENCES `OnlineStore`.`Сделки` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `OnlineStore`;

DELIMITER $$

USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Сделки_AFTER_INSERT` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Сделки_AFTER_INSERT` AFTER INSERT ON `Сделки` FOR EACH ROW
BEGIN
	INSERT INTO Чек(Сумма, Дата, Сделки_id) VALUES(NEW.Стоимость_Сделки, NEW.Дата, NEW.id);
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Сделки_AFTER_UPDATE` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Сделки_AFTER_UPDATE` AFTER UPDATE ON `Сделки` FOR EACH ROW
BEGIN
	UPDATE Чек 
    SET Сумма = NEW.Стоимость_сделки,
        Сделки_id = NEW.id,
        Дата = NEW.Дата
    WHERE Сделки_id = OLD.id;
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Сделки_BEFORE_DELETE` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Сделки_BEFORE_DELETE` BEFORE DELETE ON `Сделки` FOR EACH ROW
BEGIN
	DELETE FROM Чек WHERE Сделки_id = OLD.id;
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Поставки_Товары_AFTER_INSERT` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Поставки_Товары_AFTER_INSERT` AFTER INSERT ON `Поставки_Товары` FOR EACH ROW
BEGIN
	DECLARE lastValue int;

    SELECT КоличествоНаСкладе 
    INTO lastValue FROM Товары
    WHERE id = NEW.Товар_id;

	UPDATE Товары
    SET КоличествоНаСкладе = lastValue + NEW.КоличествоТовара
    WHERE id = NEW.Товар_id;
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Поставки_Товары_AFTER_UPDATE` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Поставки_Товары_AFTER_UPDATE` AFTER UPDATE ON `Поставки_Товары` FOR EACH ROW
BEGIN
	DECLARE lastValue int;

    SELECT КоличествоНаСкладе 
    INTO lastValue FROM Товары
    WHERE id = NEW.Товар_id;

	UPDATE Товары
    SET КоличествоНаСкладе = lastValue + (NEW.КоличествоТовара - OLD.КоличествоТовара)
    WHERE id = NEW.Товар_id;
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Поставки_Товары_AFTER_DELETE` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Поставки_Товары_AFTER_DELETE` AFTER DELETE ON `Поставки_Товары` FOR EACH ROW
BEGIN
    DECLARE lastValue int;

    SELECT КоличествоНаСкладе
    INTO lastValue FROM Товары
    WHERE id = OLD.Товар_id;

	UPDATE Товары
    SET КоличествоНаСкладе = lastValue - OLD.КоличествоТовара
    WHERE id = OLD.Товар_id;
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Сделки_Товары_AFTER_INSERT` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Сделки_Товары_AFTER_INSERT` AFTER INSERT ON `Сделки_Товары` FOR EACH ROW
BEGIN
	DECLARE lastValue int;

    SELECT КоличествоНаСкладе 
    INTO lastValue FROM Товары
    WHERE id = NEW.Товары_id;

	UPDATE Товары
    SET КоличествоНаСкладе = lastValue - NEW.КоличествоТовара
    WHERE id = NEW.Товары_id;
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Сделки_Товары_AFTER_UPDATE` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Сделки_Товары_AFTER_UPDATE` AFTER UPDATE ON `Сделки_Товары` FOR EACH ROW
BEGIN
	DECLARE lastValue int;

    SELECT КоличествоНаСкладе 
    INTO lastValue FROM Товары
    WHERE id = NEW.Товары_id;

	UPDATE Товары
    SET КоличествоНаСкладе = lastValue - (NEW.КоличествоТовара - OLD.КоличествоТовара)
    WHERE id = NEW.Товары_id;
END$$


USE `OnlineStore`$$
DROP TRIGGER IF EXISTS `OnlineStore`.`Сделки_Товары_AFTER_DELETE` $$
USE `OnlineStore`$$
CREATE DEFINER = CURRENT_USER TRIGGER `OnlineStore`.`Сделки_Товары_AFTER_DELETE` AFTER DELETE ON `Сделки_Товары` FOR EACH ROW
BEGIN
    DECLARE lastValue int;

    SELECT КоличествоНаСкладе
    INTO lastValue FROM Товары
    WHERE id = OLD.Товары_id;

	UPDATE Товары
    SET КоличествоНаСкладе = lastValue + OLD.КоличествоТовара
    WHERE id = OLD.Товары_id;
END$$


DELIMITER ;
SET SQL_MODE = '';
DROP USER IF EXISTS root;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'root' IDENTIFIED BY '0';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
