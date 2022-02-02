DROP TABLE IF EXISTS associations;
CREATE TABLE associations (
    id_association INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name_association VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    postal_code INT NOT NULL,
    city VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(50) NOT NULL
);


DROP TABLE IF EXISTS animals;
CREATE TABLE animals (
    id_animal INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(50) NOT NULL,
    picture_link VARCHAR(255) NULL,
    id_association INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (`id_association`) REFERENCES `associations` (`id_association`)
);

DROP TABLE IF EXISTS races;
CREATE TABLE races (
    id_race INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_race)
);

DROP TABLE IF EXISTS animal_race;
CREATE TABLE animal_race (
    id_animal INT NOT NULL,
    id_race INT NOT NULL,
    FOREIGN KEY (`id_animal`) REFERENCES `animals` (`id_animal`),
    FOREIGN KEY (`id_race`) REFERENCES `races` (`id_race`)
);

INSERT INTO associations (name_association, address, postal_code, city, phone, email, password) VALUES (
    'Refuge des ptites pattes',
    '3 rue des Hirondelles',
    '64100',
    'BAYONNE',
    '0687542123',
    'ptitespattes@woof.fr',
    'fraise'
),
(
    'Love cats',
    'Chemin des champs',
    '31000',
    'TOULOUSE',
    '0612547855',
    'lovecats@cat.fr',
    'fraise1'
),
(
    '35 millions de chiens',
    'Route des Fleurs',
    '40100',
    'DAX',
    '0636521478',
    'chiens@woof.fr',
    'fraise2'
);

INSERT INTO animals (name, species, picture_link, id_association, description) VALUES ( 
    'Reglisse',
    'Cat',
    'https://www.photos-animaux.com/data/photos/562/5614/561346.jpg',
    '2',
    'Reglisse est une chatte de 16 ans, douce et caline, avec un peu de personnalité tout de même. Elle apprécie plutôt la compagnie des adultes et peut tolérer un congénère.'
),
(
    'Shiva',
    'Cat',
    'https://feelloo.com/wp-content/uploads/2019/10/jeune-chat-pexels-104827-900x598.jpeg',
    '1',
    'Shiva est un jeune mâle de 2 ans. Les circonstances de son abandon sont inconnues, mais il est très câlin et peureux.'
),
(
    'Kaiko',
    'Dog',
    'https://www.protegez-vous.ca/var/protegez_vous/storage/images/_aliases/social_network_image/3/1/3/5/4465313-1-fre-CA/cout-chien.jpg',
    '3',
    'Kaiko est un magnifique croisé golden / berger australien de 5 ans, très agréable et obéissant.'
),
(
    'Malo',
    'Dog',
    'https://lemagduchien.ouest-france.fr/images/dossiers/2021-04/medaille-chien-062947.jpg',
    '3',
    'Malo est un malinois de 3 ans environ, très joueur et ok autres animaux.'
);

INSERT INTO races (name) VALUES ( 
    'Persan'
),
(
    'Bengale'
),
(
    'Chartreux'
),
(
    'Beagle'
),
(
    'Golden retriever'
),
(
    'Berger australien'
),
(
    'Cocker'
);