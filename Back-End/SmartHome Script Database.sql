Create database SmartHome
Go

use SmartHome
Go

Create table Lamp(
	id int constraint pk_Lamp_id Primary Key,
	name varchar(50),
	address varchar(50),
	imageURL varchar(50)
)
Go

/*drop table Lamp
Go*/

Create table Sensor(
	id int identity(1,1) constraint pk_Sensor_id Primary Key,
	status varchar(5),
	day datetime,
	lampId varchar(5)
)
Go

/*drop table Sensor
Go*/

Create table StatusLamp(
	id int identity(1,1) constraint pk_StatusLamp_id Primary Key,
	status varchar(5),
	day datetime,
	lampId int
)
Go
/*drop table StatusLamp
Go*/

Create table DataLog(
	id int identity(1,1) constraint pk_DataLog_id Primary Key,
	day date,
	totalTime float,
	lampId int
)
Go
/*drop table StatusLamp
Go*/



/*Delete StatusLamp
Where id = 4
Go*/
/*Delete Sensor
Where lampId = 1
Go*/
/*Delete DataLog
Where id = 3
Go*/
create procedure status_Lamp
As
Begin
select top 1 status,lampId From StatusLamp ORDER BY id DESC 
End
Go
exec status_Lamp
/*drop procedure status_Lamp
Go*/

select * from Lamp
select * from Sensor
select * from StatusLamp
select * from DataLog