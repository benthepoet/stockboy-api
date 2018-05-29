CREATE TABLE end_user (
  id INTEGER PRIMARY KEY NOT NULL,
  email VARCHAR(80) UNIQUE,
  hash CHAR(60) NOT NULL,
  balance DECIMAL(10, 4)
);

CREATE SEQUENCE seq_end_user_id;

SET TERM !! ;
CREATE TRIGGER end_user_bi FOR end_user
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR seq_end_user_id;
END!!
SET TERM ; !!


CREATE TABLE stock (
  id INTEGER PRIMARY KEY NOT NULL,
  symbol VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  sector VARCHAR(120) NOT NULL,
  last_price DECIMAL(10, 4),
  updated_at TIMESTAMP
);

CREATE sequence seq_stock_id;

SET TERM !! ;
CREATE TRIGGER stock_bi FOR stock
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR seq_stock_id;
END!!
SET TERM ; !!


CREATE TABLE stock_position (
  id INTEGER PRIMARY KEY NOT NULL,
  closed_at TIMESTAMP,
  stock_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL
);

ALTER TABLE stock_position
ADD CONSTRAINT fk_stock_position_stock_id
FOREIGN KEY (stock_id) REFERENCES stock(id);

ALTER TABLE stock_position
ADD CONSTRAINT fk_stock_position_user_id
FOREIGN KEY (user_id) REFERENCES end_user(id);

CREATE SEQUENCE seq_stock_position_id;

SET TERM !! ;
CREATE TRIGGER stock_position_bi FOR stock_position
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR seq_stock_position_id;
END!!
SET TERM ; !!


CREATE TABLE stock_order (
  id INTEGER PRIMARY KEY NOT NULL,
  units INTEGER NOT NULL,
  price DECIMAL(10, 4) NOT NULL,
  stock_position_id INTEGER NOT NULL
);

ALTER TABLE stock_order
ADD CONSTRAINT fk_stock_order_position_id
FOREIGN KEY (stock_position_id) REFERENCES stock_position(id);

CREATE SEQUENCE seq_stock_order_id;

SET TERM !!;
CREATE TRIGGER stock_order_bi FOR stock_order
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR seq_stock_order_id;
END!!
SET TERM ; !!