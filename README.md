# FMI-API-CURS

## Scop:
Un user se poate inregistra apoi loga pe propriul cont
Un user isi poate adauga categorii si taskuri in propriul cont 

## Domeniu:
https://peaceful-eyrie-40590.herokuapp.com
Repository: https://github.com/niculiviu/FMI-API-CURS 

## Web services:
# /user/register
Serviciu web cu ajutorul caruia iti poti inregistra userul.
Method: POST
Payload: 
{
	firstName:’’,
	lastName:’’,
	email:’’,
	password:’’
}
# /user/login
Serviciu web cu ajitorul caruia se realizeaza login-ul userului creat anterior. 
Method: POST
Payload: 
{
	email:’’,
	password:’’
}
# /user/getById
Serviciu web cu ajitorul caruia poti obtine informatii despre un user folosind id-ul acestuia. 
Method: POST
Payload: 
{
	_id:’’
}

# /categories/add
Serviciu web cu ajitorul caruia poti obtine informatii despre un user folosind id-ul acestuia. 
Method: POST
Payload: 
{
	name:’’, //numele categoriei
addedBy:’’ //id-ul userului logat 

}
# /categories/delete
Serviciu web cu ajitorul caruia poti sterge o categorie.. 
Method: POST
Payload: 
{
	_id:’’, //id-ul categoriei
}

# /categories/update
Serviciu web cu ajitorul caruia poti updata o categorie. 
Method: POST
Payload: 
{
	_id:’’,//id-ul categoriei
	name:’’, //numele categoriei
addedBy:’’, //id-ul userului logat
dateAdded:’’  
}
 # /categories/getById
Serviciu web cu ajitorul caruia poti obtine informtii despre o singura categorie folosind id-ul acesteia.
Method: POST
Payload: 
{
	_id:’’, //id-ul categoriei
}
# /categories/getAll
Serviciu web cu ajitorul caruia poti obtine toate categoriile adaugate. 
Method: POST
Payload: 
{
	_id:’’, //id-ul userului logat
}
#  /tasks/add
Serviciu web cu ajitorul caruia poti adauga un task.
Method: POST
Payload: 
{
	name:’’, //numele taskului
addedBy:’’, //id-ul userului logat
category:’’//categoria din care face parte

}

# /tasks/update
Serviciu web cu ajitorul caruia poti updata un task.
Method: POST
Payload: 
{
	name:’’, //numele taskului
category:’’,//categoria din care face parte
isDone:(true/false) //statusul taskului
}
# /tasks/delete
Serviciu web cu ajitorul caruia poti sterge un task.
Method: POST
Payload: 
{
	_id:’’, //id-ul taskului
}
#  /tasks/getAll

Serviciu web cu ajitorul caruia poti obtine toate taskurile adaugate.
Method: POST
Payload: 
{
	addedBy:’’, //id-ul userului logat
}
# /tasks/getById
Serviciu web cu ajutorul caruia poti obtine informtii despre o un task folosind id-ul acestuia
Method: POST
Payload: 
{
	_id:’’, //id-ul taskului
}

