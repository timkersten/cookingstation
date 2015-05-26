<?php
/**
 * De page klas is een controller klasse.
 * ....
 *
 * @package Cookingstation Controller
 * @author Tim Kersten
 * @version v0.1
 */
class Page extends CI_Controller {

	/**
	 * De view functie toont één statische pagina en twee dynamische elementen (top en bottom)
	 *
	 * @param $page string - De betreffende statische pagina die getoond moet worden.	
	 */
	public function view($page = 'start')
	{
		// Controleer of de opgevraagde pagina daadwerkelijk bestaat.
		if(!file_exists(APPPATH.'/views/pages/'.$page.'.php'))
		{
			// Indien de pagina niet bestaat. Toon een '404 page not found' error.
			show_404();
		}

		// M.b.v. de data array kan er data naar de view worden gestuurd.
		$data['title'] = ucfirst($page);

		// Laad de views in de juiste volgorde (top, main-content, bottom)
		$this->load->view('templates/header', $data);
		$this->load->view('pages/' .$page, $data);
		$this->load->view('templates/footer', $data);

	}

}

?>