SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema PFE
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `PFE_DATA_BASE` DEFAULT CHARACTER SET utf8 ;
USE `PFE_DATA_BASE` ;

-- -----------------------------------------------------
-- Table `Compte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Compte` (
  `IdCompte` int auto_increment not null,
  `Email` VARCHAR(255) NOT NULL,
  `MotDePass` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`IdCompte`)
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Role` (
  `IdRole` INT NOT NULL auto_increment,
  `Role` enum ('Admin','Etudiant','Enseignant','Entreprise'),
  PRIMARY KEY (`IdRole`))
ENGINE = InnoDB;

INSERT INTO ROLE(Role) values ('Admin'),
('Etudiant'),('Enseignant'),('Entreprise');
select * from Role;

-- -----------------------------------------------------
-- Table `UserRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UserRole` (
  `IdCompte` INT NOT NULL,
  `IdRole` INT NOT NULL,
  PRIMARY KEY (`IdCompte`, `IdRole`),
    FOREIGN KEY (`IdCompte`)
    REFERENCES `Compte` (`IdCompte`),
    FOREIGN KEY (`IdRole`)
    REFERENCES `Role` (`IdRole`)
    )
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `Role`
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Table `Promo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Promo` (
  `IdPromo` INT auto_increment not null,
  `Niveau` enum('1CPI','2CPI','1CS','2CS','3CS'),
  `Filiere` VARCHAR(45),
  `MaxMembreEquipe` INT NOT NULL,
  `Annee` YEAR NOT NULL,
  `NbMaxTheme` VARCHAR(45) NOT NULL,
  `MaxEquipeParTheme` INT NOT NULL,
  PRIMARY KEY (`IdPromo`)
)
ENGINE = InnoDB;
INSERT INTO Promo(Niveau,Filiere,MaxMembreEquipe,Annee,NbMaxTheme,MaxEquipeParTheme)
VALUES('1CPI','TC',6,'2022',5,6),('2CPI','TC',6,'2022',5,6),('1CS','TC',6,'2022',5,6),
('2CS','ISI',6,'2022',5,5),('2CS','SIW',6,'2022',5,5),('3CS','ISI',2,'2022',25,5),
('3CS','SIW',2,'2022',25,5);
select * from Promo;
-- -----------------------------------------------------
-- Table `Etudiant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Etudiant` (
  `IdEtudiant` INT NOT NULL auto_increment,
  `Nom` VARCHAR(45) NOT NULL,
  `Prenom` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `IdCompte` INT NOT NULL ,
  `IdPromo` INT  NOT NULL,
  `IdEquipe` INT DEFAULT NULL,
  PRIMARY KEY (`IdEtudiant`),
    FOREIGN KEY (`IdCompte`)
    REFERENCES `Compte` (`IdCompte`),
    FOREIGN KEY (`IdPromo`)
    REFERENCES `Promo` (`IdPromo`)
    )
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `Equipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Equipe` (
  `IdEquipe` INT NOT NULL auto_increment,
  `IdChefEquipe` INT NOT NULL,
  PRIMARY KEY (`IdEquipe`, `IdChefEquipe`),
    FOREIGN KEY (`IdChefEquipe`)
    REFERENCES `Etudiant` (`IdEtudiant`)
   )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Invitation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Invitation` (
  `IdEquipe` INT NOT NULL,
  `IdEtudiant` INT NOT NULL,
  `Status` enum('envoyer','accepter'),
  PRIMARY KEY (`IdEquipe`, `IdEtudiant`),
    FOREIGN KEY (`IdEquipe`)
    REFERENCES `Equipe` (`IdEquipe`),
    FOREIGN KEY (`IdEtudiant`)
    REFERENCES `Etudiant` (`IdEtudiant`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Enseignant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Enseignant` (
  `IdEnseignant` INT NOT NULL auto_increment,
  `Grade` VARCHAR(45) NOT NULL,
  `Email` varchar(255) not null,
   `Nom` VARCHAR(45) NOT NULL,
  `Prenom` VARCHAR(45) NOT NULL,
  `Specialite` VARCHAR(45) NOT NULL,
  `CanBeJury` BOOLEAN NOT NULL,
  `CanBeEncadrant` BOOLEAN NOT NULL,
  `IdCompte` INT NOT NULL,
  PRIMARY KEY (`IdEnseignant`),
    FOREIGN KEY (`IdCompte`)
    REFERENCES `Compte` (`IdCompte`)
    )
ENGINE = InnoDB;
#insert into Enseignant(Grade,Email,Nom,Prenom,Specialite,CanBeJury,CanBeEncadrant,IdCompte)
#values('Professeur','d.amarbensaber@esi-sba.dz','AMAR BENSABER','DJAMEL','SIW',true,true,2);
-- -----------------------------------------------------
-- Table `Administrateur`

-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Administrateur` (
  `IdAdministrateur` INT NOT NULL auto_increment,
  `Email` varchar(255) not null,
  `Nom` VARCHAR(45) NOT NULL,
  `Prenom` VARCHAR(45) NOT NULL,
  `IdCompte` INT NOT NULL,
  PRIMARY KEY (`IdAdministrateur`),
    FOREIGN KEY (`IdCompte`)
    REFERENCES `Compte` (`IdCompte`)
    )
ENGINE = InnoDB;
select * from Administrateur;
show tables;
-- -----------------------------------------------------
-- Table `Entreprise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Entreprise` (
  `IdEntreprise` INT NOT NULL auto_increment,
  `Nom` VARCHAR(45) NOT NULL,
  `Domaine` VARCHAR(45) NOT NULL,
  `Adresse` VARCHAR(45) NOT NULL,
  `Tel` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `IdCompte` INT NOT NULL,
  PRIMARY KEY (`IdEntreprise`),
    FOREIGN KEY (`IdCompte`)
    REFERENCES `Compte` (`IdCompte`)
    )
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `Theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Theme` (
  `IdTheme` INT auto_increment not null ,
  `Titre` VARCHAR(45) NOT NULL,
  `TitreComplet` VARCHAR(250) NOT NULL,
  `Description` VARCHAR(2000) NOT NULL,
  `Promo` enum('1CPI','2CPI','3CS','4CS-ISI','4CS-SIW','5CS-ISI','5CS-SIW'),
  `Annee` YEAR NOT NULL,
  `TechnoBack` VARCHAR(45) NOT NULL,
  `TechnoFront` VARCHAR(45) NOT NULL,
  `MotsCles` VARCHAR(45) NOT NULL,
  `Status` enum('Valider','Refuser','PasEncore'),
  `PlanDeTravail` VARCHAR(45) NOT NULL,
  `IdEnseignant` INT ,
  `IdEntreprise` INT ,
  PRIMARY KEY (`IdTheme`),
    FOREIGN KEY (`IdEnseignant`)
    REFERENCES `Enseignant` (`IdEnseignant`),
    FOREIGN KEY (`IdEntreprise`)
    REFERENCES `Entreprise` (`IdEntreprise`)
    )
ENGINE = InnoDB;
insert into Theme(Titre,TitreComplet,Description,Promo,
Annee,TechnoBack,TechnoFront,MotsCles,Status,PlanDeTravail,IdEnseignant)
values('PFE',"Gestion des projets de fin d'études","Conception et réalisation d'une application Fulll Web de gestion des projets de fin d'études à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','Vue.JS','gestion projet application web ','PasEncore','Methode Agile',1),
('Enseignement',"Gestion des enseignement","Conception et réalisation d'une application Fulll Web pour la gestion des enseignements à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','React.JS','gestion enseignements application web ','PasEncore','Methode Agile',1),
('PFE1',"Gestion des projets de fin d'études","Conception et réalisation d'une application Fulll Web de gestion des projets de fin d'études à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','Vue.JS','gestion projet application web ','Valider','Methode Agile',1),
('Enseignement1',"Gestion des enseignement","Conception et réalisation d'une application Fulll Web pour la gestion des enseignements à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','React.JS','gestion enseignements application web ','PasEncore','Methode Agile',1);

-- -----------------------------------------------------
-- Table `Choix`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Choix` (
  `IdEquipe` INT NOT NULL,
  `IdTheme` INT NOT NULL,
  `Priorite` INT NOT NULL,
  PRIMARY KEY (`IdEquipe`, `IdTheme`),
    FOREIGN KEY (`IdEquipe`)
    REFERENCES `Equipe` (`IdEquipe`),
    FOREIGN KEY (`IdTheme`)
    REFERENCES `Theme` (`IdTheme`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projet` (
  `IdProjet` INT auto_increment not null ,
 /* `Type` enum('PFE','Pluridisciplinaire'),*/
  `IdTheme` INT NOT NULL,
  `IdEquipe` INT NOT NULL,
   `IdEncadrant` INT DEFAULT NULL,
   `NoteEncadrant` VARCHAR(45) NULL,
  PRIMARY KEY (`IdProjet`),
    FOREIGN KEY (`IdTheme`)
    REFERENCES `Theme` (`IdTheme`),
    FOREIGN KEY (`IdEquipe`)
    REFERENCES `Equipe` (`IdEquipe`),
     FOREIGN KEY (`IdEncadrant`)
    REFERENCES `Enseignant` (`IdEnseignant`)
    )
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `Livrable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Livrable` (
  `IdLivrable` INT auto_increment not null ,
  `Titre` VARCHAR(45) NOT NULL,
  `Name`VARCHAR(255) not null,
  `Date` datetime not null,
  `IdEtudiant` INT NOT NULL,
  `IdProjet` INT NOT NULL,
  PRIMARY KEY (`IdLivrablse`),
    FOREIGN KEY (`IdEtudiant`)
    REFERENCES `Etudiant` (`IdEtudiant`),
    FOREIGN KEY (`IdProjet`)
    REFERENCES `Projet` (`IdProjet`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Meeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Meeting` (
  `IdMeeting` INT auto_increment not null,
  `Date` DATETIME NOT NULL,
  `Type` VARCHAR(45) NOT NULL,
  `Salle` VARCHAR(45) NULL,
  `Lien` VARCHAR(45) NULL,
  `IdProjet` INT NOT NULL,
  PRIMARY KEY (`IdMeeting`),
    FOREIGN KEY (`IdProjet`)
    REFERENCES `Projet` (`IdProjet`)
 )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PvMeeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PvMeeting` (
  `IdPvMeeting` INT auto_increment not null ,
  `Description` VARCHAR(2000) NOT NULL,
  `ProgresPourcentage` INT NOT NULL,
  `IdMeeting` INT NOT NULL,
  PRIMARY KEY (`IdPvMeeting`),
    FOREIGN KEY (`IdMeeting`)
    REFERENCES `Meeting` (`IdMeeting`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Tache`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Tache` (
  `IdTache` INT auto_increment not null ,
  `Description` VARCHAR(1000) NOT NULL,
  `DateDebut` DATETIME NOT NULL,
  `DateFin` DATETIME NOT NULL,
  `IdPvMeeting` INT NOT NULL,
  PRIMARY KEY (`IdTache`),
    FOREIGN KEY (`IdPvMeeting`)
    REFERENCES `PvMeeting` (`IdPvMeeting`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Soutenance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Soutenance` (
  `IdSoutenance` INT auto_increment not null,
  `DateAutorisation` DATETIME NOT NULL,
  `DateSoutenance` DATETIME DEFAULT NULL,
  `IdProjet` INT NOT NULL,
  PRIMARY KEY (`IdSoutenance`),
    FOREIGN KEY (`IdProjet`)
    REFERENCES `Projet` (`IdProjet`)
 )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PvSoutenance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PvSoutenance` (
  `IdPvSoutenance` INT auto_increment not null,
  `Note` INT NOT NULL,
  `Resume` VARCHAR(1000) NOT NULL,
  `Mention` VARCHAR(45) NOT NULL,
  `IdSoutenance` INT NOT NULL,
  PRIMARY KEY (`IdPvSoutenance`),
    FOREIGN KEY (`IdSoutenance`)
    REFERENCES `Soutenance` (`IdSoutenance`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Jury`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Jury` (
  `IdJury` INT NOT NULL,
  `IdSoutenance` INT NOT NULL,
  /*`Role` enum('Principale','CoJury'),*/
  `Note` REAL DEFAULT NULL,
  PRIMARY KEY (`IdJury`, `IdSoutenance`),
    FOREIGN KEY (`IdJury`)
    REFERENCES `Enseignant` (`IdEnseignant`),
    FOREIGN KEY (`IdSoutenance`)
    REFERENCES `Soutenance` (`IdSoutenance`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Present`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Present` (
  `IdEtudiant` INT NOT NULL,
  `IdMeeting` INT NOT NULL,
  PRIMARY KEY (`IdEtudiant`, `Idmeeting`),
    FOREIGN KEY (`IdEtudiant`)
    REFERENCES `Etudiant` (`IdEtudiant`),
    FOREIGN KEY (`IdMeeting`)
    REFERENCES `Meeting` (`IdMeeting`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Moyenne`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Moyenne` (
  `IdMoyenne` INT auto_increment not null,
  `Note` REAL NOT NULL,
  `IdEtudiant` INT NOT NULL,
  PRIMARY KEY (`IdMoyenne`),
    FOREIGN KEY (`IdEtudiant`)
    REFERENCES `Etudiant` (`IdEtudiant`)
    )
ENGINE = InnoDB;
CREATE table IF NOT exists Commentaires(
`IdComment` INT NOT NULL auto_increment,
`Comment` VARCHAR(400) ,
`IdLivrable` int not null,
`IdEnseignant` int not null,
primary key (IdComment),
FOREIGN KEY (`IdLivrable`)
    REFERENCES `Livrable` (`IdLivrable`),
    FOREIGN KEY (`IdEnseignant`)
    REFERENCES `IdEnseignant` (`IdEnseignant`)
)
ENGINE = InnoDB;
select * from Compte order by IdCompte;
select * from Promo;
select * from theme;
select* from Enseignant;
select * from Etudiant;
delete from Etudiant where IdCompte =2;
#delete from Enseignant where IdCompte =2;
update Enseignant set IdCompte=100 where IdCompte=2;
select * from UserRole;
#insert into UserRole(IdCompte,IdRole)values(1,2);
delete from UserRole where IdCompte =7;
delete from Compte where IdCompte =2;
show tables;
select* from Administrateur;
select * from Livrable;
select * from Commentaires;
#update theme set IdEnseignant=400 where IdEnseignant=1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
#drop database pfe_data_base;

