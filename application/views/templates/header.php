<?php 
  include_once './vendor/autoload.php'; 
  // Make sure to load the Facebook SDK for PHP via composer or manually
?>

<!DOCTYPE html>
<html lang="eng">
	<head>
    <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
    <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon.png"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">    
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="description" content="Cooking Station is een schoolproject van de Hoogeschool van Arnhem en Nijmegen. Het project is ontstaan vanuit de minor Digitial Media Productions (afgekort DMP). Beknopte omschrijving van het project: Cooking Station is een online platform waar gebruikers inspiratie op kunnen doen m.b.t. het bereiden van een gerecht. Daarnaast heeft Cooking Station als doel de gebruiker bewust te laten worden van zijn of haar eetgedrag. Op basis van de (door de gebruiker) gegeten maaltijden die bij Cooking Station worden geregistreerd, wordt een advies uitgebracht. Dit advies moet de gebruiker motiveren om het huidige eetpatroon te wijzigen of juist motiveren om op deze gezonde wijze door te gaan. ">
    <meta name="author" content="Roel de Man en Tim Kersten">
    <link href=<?php echo base_url().'assets/css/bootstrap.css'; ?> rel="stylesheet" type="text/css">
    <link href=<?php echo base_url().'assets/css/style.css'; ?> rel="stylesheet" type="text/css">
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src=<?php echo base_url().'assets/js/bootstrap.min.js'; ?>></script>
    <title>Cooking Station</title>
	</head>
	<body>
  <div class="header"> 
        <img src=<?php echo base_url().'assets/img/small-logo.png'; ?> alt="Cooking Station">
  </div>