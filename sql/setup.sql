-- user
CREATE SEQUENCE user_id_sequence;

SET TERM !! ;
CREATE TRIGGER user_autoincrement FOR user
ACTIVE BEFORE INSERT POSITION 0
AS
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR user_id_sequence
BEGIN
END
SET TERM ; !!

CREATE TABLE user (
  id INTEGER PRIMARY NOT NULL,
  email VARCHAR(255) UNIQUE,
  hash CHAR(60) NOT NULL,
  balance DECIMAL(10, 4)
);

-- stock
CREATE sequence stock_id_sequence;

SET TERM !! ;
CREATE TRIGGER stock_autoincrement FOR stock
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR stock_id_sequence
END
SET TERM ; !!

CREATE TABLE stock (
  id INTEGER PRIMARY KEY NOT NULL,
  symbol VARCHAR(8) NOT NULL UNIQUE,
  name VARHCAR(255) NOT NULL,
  sector VARCHAR(255) NOT NULL,
  last_price DECIMAL(10, 4),
  updated_at TIMESTAMP
);

-- stock_position
CREATE SEQUENCE stock_position_id_sequence;

SET TERM !! ;
CREATE TRIGGER stock_position_autoincrement FOR stock_position
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR stock_position_id_sequence
END
SET TERM ; !!

CREATE TABLE stock_position (
  id INTEGER PRIMARY KEY NOT NULL,
  closed_at TIMESTAMP,
  stock_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL
);

ALTER TABLE stock_position
ADD CONSTRAINT fk_stock_position_stock_id
FOREIGN KEY (stock_id) REFERENCES stock(id)

ALTER TABLE stock_position
ADD CONSTRAINT fk_stock_position_user_id
FOREIGN KEY (user_id) REFERENCES user(id)

-- stock_position_order
CREATE SEQUENCE stock_position_order_id_sequence;

SET TERM !!;
CREATE TRIGGER stock_position_order_autoincrement FOR stock_position_order
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR stock_position_order_id_sequence;
END!!
SET TERM ; !!

CREATE TABLE stock_position_order (
  id INTEGER NOT NULL,
  units INTEGER NOT NULL,
  price DECIMAL(10, 4) NOT NULL,
  stock_position_id INTEGER NOT NULL
);

ALTER TABLE stock_position_order
ADD CONSTRAINT fk_stock_position_order_position_id
FOREIGN KEY (stock_position_id) REFERENCES stock_position(id)