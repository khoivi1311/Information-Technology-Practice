using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SmartHome.Models;

namespace SmartHome.Controllers
{
    public class SmartHomeController : ApiController
    {
        // GET api/<controller>
        SmartHomeEntities ctx = new SmartHomeEntities();
        [HttpGet]
        [ActionName("getAllLamp")]
        public List<Lamp> getAllLamp()
        {
            return ctx.Lamps.ToList();
        }

        [HttpGet]
        [ActionName("getAllSensor")]
        public List<Sensor> getAllSensor()
        {
            return ctx.Sensors.ToList();
        }

        [HttpGet]
        [ActionName("getAllStatusLamp")]
        public List<StatusLamp> getAllStatusLamp()
        {
            return ctx.StatusLamps.ToList();
        }

        [HttpGet]
        [ActionName("getDataLog")]
        public List<DataLog> getDataLog()
        {
            return ctx.DataLogs.ToList();
        }

        [HttpGet]
        [ActionName("getStatus")]
        public List<status_Lamp_Result> getStatus()
        {
            return ctx.status_Lamp().ToList();
        }
        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        [ActionName("AddSensor")]
        public void Post([FromBody] Sensor value)
        {
            ctx.Sensors.Add(value);
            ctx.SaveChanges();
        }
        [HttpPost]
        [ActionName("AddStatusLamp")]
        public void Post1([FromBody] StatusLamp value)
        {
            ctx.StatusLamps.Add(value);
            ctx.SaveChanges();
        }
        [HttpPost]
        [ActionName("AddDataLog")]
        public void Post2([FromBody] DataLog value)
        {
            ctx.DataLogs.Add(value);
            ctx.SaveChanges();
        }
        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}