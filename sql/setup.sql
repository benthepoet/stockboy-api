CREATE TABLE k_user (
  id INTEGER PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE,
  hash CHAR(60) NOT NULL,
  balance DECIMAL(10, 4)
);

CREATE SEQUENCE user_id_seq;

SET TERM !! ;
CREATE TRIGGER user_autoinc FOR k_user
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR user_id_seq;
END!!
SET TERM ; !!


CREATE TABLE stock (
  id INTEGER PRIMARY KEY NOT NULL,
  symbol VARCHAR(8) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  sector VARCHAR(255) NOT NULL,
  last_price DECIMAL(10, 4),
  updated_at TIMESTAMP
);

CREATE sequence stock_id_seq;

SET TERM !! ;
CREATE TRIGGER stock_autoinc FOR stock
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR stock_id_seq;
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
FOREIGN KEY (user_id) REFERENCES k_user(id);

CREATE SEQUENCE stock_position_id_seq;

SET TERM !! ;
CREATE TRIGGER stock_position_autoinc FOR stock_position
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR stock_position_id_seq;
END!!
SET TERM ; !!


CREATE TABLE stock_position_order (
  id INTEGER PRIMARY KEY NOT NULL,
  units INTEGER NOT NULL,
  price DECIMAL(10, 4) NOT NULL,
  stock_position_id INTEGER NOT NULL
);

ALTER TABLE stock_position_order
ADD CONSTRAINT fk_stock_position_order_position_id
FOREIGN KEY (stock_position_id) REFERENCES stock_position(id);

CREATE SEQUENCE stock_position_order_id_seq;

SET TERM !!;
CREATE TRIGGER stock_position_order_autoinc FOR stock_position_order
ACTIVE BEFORE INSERT POSITION 0
AS
BEGIN
  IF (NEW.id IS NULL) THEN
    NEW.id = NEXT VALUE FOR stock_position_order_id_seq;
END!!
SET TERM ; !!