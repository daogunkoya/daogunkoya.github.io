<?php
require_once ("addon.php");

class REST extends Addon{
	public $mysqli=NULL;
	
	const DB_SERVER="localhost";
	const DB_USER="as";
	const DB_PASSWORD="as";
	const DB_DB="nitty";
	
	public function __contruct(){
		parent:: __construct();
		$this->dbconnect();
		
	}
	
	public function dbconnect(){
		$this->mysqli=new mysqli(self::DB_SERVER,self::DB_USER,self::DB_PASSWORD,self::DB_DB);
	}
	
	public function processMethod(){
		$method=trim(str_replace('/','',$_REQUEST['x']));
		if((int)method_exists($this,$method) > 0){
			$this->$method();
		}
		else{
			$this->response('',406);
		}
	}
	
	public function test(){
		$link='../index.html';
		$this->view($link);
	}
	
	public function contact(){	
		$sender=  @trim(stripslashes($_POST['sender'])); 
		$email=  @trim(stripslashes($_POST['email'])); 
		$subject=  @trim(stripslashes($_POST['subject'])); 
		$body=  @trim(stripslashes($_POST['message'])); 
		$admin_receiver="danielbillion@gmail.com";
//send email
		if(filter_var($email, FILTER_VALIDATE_EMAIL)){
		
			
			$sent = mail($admin_receiver, $subject, $this->email_message($sender,$email,$subject,$body), $this->email_header($email)) ; 
					 if($sent){
					 $result=array('type'=>'success', 'message'=>'sent successfully');
					$this->set_header();
					 echo json_encode($result);
				 }
					 else{
						 $result=array('error'=>'406', 'message'=>'not sent');
						$this->set_header();
						 echo json_encode($result);
					 }
			}
		else{
				$result=array('error'=>'406', 'message'=>'invalid email');
				$this->set_header();
				 echo json_encode($result);
			
		}
	}	
}

$api=new REST;
$api->processMethod();
?>