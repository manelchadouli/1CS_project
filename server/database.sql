SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

#drop database PFE_DATA_BASE;
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
  `NbMaxTheme` INT NOT NULL,
 /* `MaxEquipeParTheme` INT NOT NULL,*/
  PRIMARY KEY (`IdPromo`)
)
ENGINE = InnoDB;
INSERT INTO Promo(Niveau,Filiere,MaxMembreEquipe,Annee,NbMaxTheme,MaxEquipeParTheme)
VALUES('1CPI','TC',6,year(now()),5,6),('2CPI','TC',6,year(now()),5,6),('1CS','TC',6,year(now()),5,6),
('2CS','ISI',6,year(now()),5,5),('2CS','SIW',6,year(now()),5,5),('3CS','ISI',2,year(now()),25,5),
('3CS','SIW',2,year(now()),25,5);
select * from Promo;
-- -----------------------------------------------------
-- Table `Etudiant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Etudiant` (
  `IdEtudiant` INT NOT NULL auto_increment,
  `Nom` VARCHAR(45) NOT NULL,
  `Prenom` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Moyenne` REAL DEFAULT NULL,
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
  `IdChefEquipe` INT NOT NULL unique,
  PRIMARY KEY (`IdEquipe`, `IdChefEquipe`),
    FOREIGN KEY (`IdChefEquipe`)
    REFERENCES `Etudiant` (`IdEtudiant`)
   )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Invitation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Invitation` (
  `IdEquipe` INT NOT NULL ,
  `IdEtudiant` INT NOT NULL ,
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
  `Grade` enum('MAA','MAB','MCA','MCB','PR'),
  `Email` varchar(255) not null,
   `Nom` VARCHAR(45) NOT NULL,
  `Prenom` VARCHAR(45) NOT NULL,
  `Specialite` VARCHAR(1000) NOT NULL,
  `CanBeJury` BOOLEAN NOT NULL,
  `CanBeEncadrant` BOOLEAN NOT NULL,
  `IdCompte` INT NOT NULL,
  PRIMARY KEY (`IdEnseignant`),
    FOREIGN KEY (`IdCompte`)
    REFERENCES `Compte` (`IdCompte`)
    )
ENGINE = InnoDB;
/*insert into Enseignant(Grade,Email,Nom,Prenom,Specialite,CanBeJury,CanBeEncadrant,IdCompte)
values('Professeur','d.amarbensaber@esi-sba.dz','AMAR BENSABER','DJAMEL','SIW',true,true,2);*/
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
  `Domaine` VARCHAR(1000) NOT NULL,
  `Adresse` VARCHAR(1000) NOT NULL,
  `Tel` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
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
  `TitreComplet` VARCHAR(1000) NOT NULL,
  `Description` VARCHAR(5000) NOT NULL,
  `TechnoBack` VARCHAR(1000) NOT NULL,
  `TechnoFront` VARCHAR(1000) NOT NULL,
  `MotsCles` VARCHAR(1000) NOT NULL,
  `Status` enum('Valider','Refuser','PasEncore'),
  `PlanDeTravail` VARCHAR(3000) NOT NULL,
  `IdEnseignant` INT ,
  `IdEntreprise` INT ,
  `IdPromo` INT NOT NULL,
  PRIMARY KEY (`IdTheme`),
    FOREIGN KEY (`IdEnseignant`)
    REFERENCES `Enseignant` (`IdEnseignant`),
    FOREIGN KEY (`IdEntreprise`)
    REFERENCES `Entreprise` (`IdEntreprise`),
     FOREIGN KEY (`IdPromo`)
    REFERENCES `Promo` (`IdPromo`)
    )
ENGINE = InnoDB;
/*insert into Theme(Titre,TitreComplet,Description,Promo,
Annee,TechnoBack,TechnoFront,MotsCles,Status,PlanDeTravail,IdEnseignant)
values('PFE',"Gestion des projets de fin d'études","Conception et réalisation d'une application Fulll Web de gestion des projets de fin d'études à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','Vue.JS','gestion projet application web ','PasEncore','Methode Agile',1),
('Enseignement',"Gestion des enseignement","Conception et réalisation d'une application Fulll Web pour la gestion des enseignements à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','React.JS','gestion enseignements application web ','PasEncore','Methode Agile',1),
('PFE1',"Gestion des projets de fin d'études","Conception et réalisation d'une application Fulll Web de gestion des projets de fin d'études à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','Vue.JS','gestion projet application web ','Valider','Methode Agile',1),
('Enseignement1',"Gestion des enseignement","Conception et réalisation d'une application Fulll Web pour la gestion des enseignements à l'ESI de Sidi Bel Abbes",'3CS','2022',
'express.js mysql','React.JS','gestion enseignements application web ','PasEncore','Methode Agile',1);*/

-- -----------------------------------------------------
-- Table `Choix`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Choix` (
  `IdEquipe` INT NOT NULL,
  `IdTheme` INT NOT NULL,
  `Priorite` INT NOT NULL,
  `DateEnvoi` datetime not null,
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
  `IdTheme` INT NOT NULL,
  `IdEquipe` INT NOT NULL unique,
   `IdEncadrant` INT DEFAULT NULL,
   `NoteEncadrant` 	REAL NULL,
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
  `Titre` VARCHAR(255) NOT NULL,
  `Lien` VARCHAR(1000) NULL,
  `IdEtudiant` INT NOT NULL,
  `IdProjet` INT NOT NULL,
  PRIMARY KEY (`IdLivrable`),
    FOREIGN KEY (`IdEtudiant`)
    REFERENCES `Etudiant` (`IdEtudiant`),
    FOREIGN KEY (`IdProjet`)
    REFERENCES `Projet` (`IdProjet`)
    )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Salle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Salle` (
  `IdSalle` INT NOT NULL,
  `Nom` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSalle`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Meeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Meeting` (
  `IdMeeting` INT auto_increment not null,
  `Date` DATETIME NOT NULL,
  `Type` VARCHAR(45) NOT NULL,
  `Lien` VARCHAR(1000) NULL,
  `IdProjet` INT NOT NULL,
  `IdSalle` INT NULL,
  PRIMARY KEY (`IdMeeting`),
    FOREIGN KEY (`IdProjet`)
    REFERENCES `Projet` (`IdProjet`),
  FOREIGN KEY (`IdSalle`)
    REFERENCES `Salle` (`IdSalle`)
 )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PvMeeting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PvMeeting` (
  `IdPvMeeting` INT auto_increment not null ,
  `Description` VARCHAR(5000) NOT NULL,
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
  `Description` VARCHAR(3000) NOT NULL,
  `DateDebut` DATETIME NOT NULL,
  `DateFin` DATETIME NOT NULL,
  `IdPvMeeting` INT NOT NULL,
  PRIMARY KEY (`IdTache`),
    FOREIGN KEY (`IdPvMeeting`)
    REFERENCES `PvMeeting` (`IdPvMeeting`)
    )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Commentaire`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Commentaire` (
  `IdCommentaire` INT NOT NULL,
  `Text` VARCHAR(3000) NOT NULL,
  `IdLivrable` INT NOT NULL,
  `IdEnseignant` INT NOT NULL,
  PRIMARY KEY (`IdCommentaire`, `IdLivrable`, `IdEnseignant`),
    FOREIGN KEY (`IdLivrable`)
    REFERENCES `Livrable` (`IdLivrable`),
    FOREIGN KEY (`IdEnseignant`)
    REFERENCES `Enseignant` (`IdEnseignant`)
    )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Soutenance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Soutenance` (
  `IdSoutenance` INT NOT NULL,
  `DateSoutenance` DATE NULL,
  `DateAutorisation` DATE NOT NULL,
  `Duree` time NULL,
  `heure` time NULL,
  `IdProjet` INT NOT NULL,
  `IdSalle` INT NOT NULL,
  PRIMARY KEY (`IdSoutenance`, `IdProjet`, `IdSalle`),
    FOREIGN KEY (`IdProjet`)
    REFERENCES `Projet` (`IdProjet`),
    FOREIGN KEY (`IdSalle`)
    REFERENCES `Salle` (`IdSalle`)
    )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `PvSoutenance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `PvSoutenance` (
  `IdPvSoutenance` INT auto_increment not null,
  `Note` INT NOT NULL,
  `Resume` VARCHAR(5000) NOT NULL,
  `Mention` enum('AssezBien','Bien','TresBien'),
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
  `Role` enum('Principale','CoJury'),
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



select * from Compte order by IdCompte;
#delete from Compte where IdCompte = 6;
select * from Promo;
select * from theme;
select * from Equipe ;
#delete from Theme where IdTheme = 1;
#delete from Equipe where IdEquipe = 1;
#delete from Equipe WHERE IdChefEquipe = 7;
select* from Enseignant;
select * from Etudiant;
select * from Invitation;
select * from Soutenance;
#update Invitation set Status='envoyer' where IdEquipe = 1;
#update Etudiant set IdEquipe = null where IdEtudiant = 6;
#delete from Invitation where IdEquipe = 3;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
#drop database pfe_data_base;

