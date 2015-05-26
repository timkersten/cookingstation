<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
| 
| Original default routes:
| $route['default_controller'] = 'welcome';
| $route['404_override'] = '';
| $route['translate_uri_dashes'] = FALSE;
|
*/

/* 
 * Met custom routes kun je een url aan een specifieke controller en methode koppelen i.p.v. 
 * de gebruikelijke normale conventie ( http://example.com/[controller-class]/[controller-method]/[arguments] ) 
 * CodeIgniter leest routing regels van top to bottom. Zodra er een request binnenkomt zoekt codeIgniter naar 
 * de eerste routing match en roept de geschikte controller en methode aan (mogelijk met argumenten).
 */

$route['default_controller'] = 'page/view';
// Verwijs de user door naar de bijbehorende controller zodra er een request binnenkomt die niet gedefineerd staat in routes.php
$route['(:any)'] = 'page/view/$1';

