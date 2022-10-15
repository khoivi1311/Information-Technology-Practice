let lightStatus;
let lightStatus2;
let sensorStatus = false;
let sensorStatus2 = false;
// Tính thời gian sử dụng
let hStart, mStart, sStart, hStart2, mStart2, sStart2;
let hEnd, mEnd, sEnd, hEnd2, mEnd2, sEnd2;
axios({
  method: 'get',
  url: 'http://localhost/smarthome1/api/smarthome/getAllStatusLamp',
}).then(res => {
  let items = res.data
  
  for(let i = items.length - 1 ; i >= 0 ; i--){ 
    console.log(items[i])
    if(items[i].lampId == 1 && items[i].status == 'ON'){
      lightStatus = true
      hStart = items[i].day.slice(11,13)
      mStart = items[i].day.slice(14,16)
      sStart = items[i].day.slice(17,19)
      console.log(`${hStart}:${mStart}:${sStart}`)
      break
    } 
     else if(items[i].lampId == 1 && items[i].status == 'OFF'){
      lightStatus = false
      break;
    }
    if(items[i].lampId == 2 ){
      continue;
    }
  }
 
  
  for(let i = items.length - 1 ; i >= 0 ; i--){ 
    console.log(items[i])
    if(items[i].lampId == 2 && items[i].status == 'ON'){
      hStart2 = items[i].day.slice(11,13)
      mStart2 = items[i].day.slice(14,16)
      sStart2 = items[i].day.slice(17,19)
      console.log(`${hStart2}:${mStart2}:${sStart2}`)
      lightStatus2 = true
      break
    } 
     else if(items[i].lampId == 2 && items[i].status == 'OFF'){
      lightStatus2 = false
      break;
    }
    if(items[i].lampId == 1 ){
      continue;
    }
  }
 
  console.log('Trạng thái đèn 1 khi render:', lightStatus)
  console.log('Trạng thái đèn 2 khi render:', lightStatus2)

}).then(() => {
  axios({
    method: 'get',
    url: 'http://localhost/smarthome1/api/smarthome/getAllLamp',
  })
    .then((res) => {
      let items = res.data;
      let htmlStr = '';
      items.forEach((item) => {
        // console.log(item)
        console.log(item.id, lightStatus)
        if(lightStatus == true && item.id == 1){
          htmlStr += ` <div class="room__card col-6 ">
          <div class="card " >
          <img class="card-img-top" src="img/${item.imageURL}" alt="Card image cap">
           <div class="card-body">
            <h5 class="card-title">${item.address}</h5>
            <p class="card-text">Trạng thái đèn: <span id='light__sensor${item.id}'' class="light__sensor">ON</span> <span class="ml-4 card-text">Chế độ nhận diện: <span id="pir__sensor${item.id}" class="pir__sensor" >OFF</span></span></p>
            <div id="light__Button${item.id}" class="button2 light__Button">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           TẮT ĐÈN
         </div>
         <a id="sensorDiary${item.id}" class=" sensor__Button button2" href="#sensorPopup${item.id}">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="fas fa-box"></i>
         </a>
           <a id="diary${item.id}" class=" diary__button button2" href="#popup${item.id}">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <i class="fas fa-book"></i>
         </a>
         <div id="popup${item.id}" class="overlay__popup">
           <div class="popup${item.id}">
             <h2>Nhật ký của ${item.address}</h2>
             <a id="close${item.id}" class="close" href="#room__row">&times;</a>
             <div id="popcontent${item.id}" class="content">
              <table id="table${item.id}" class="tableDiary">
               <tr>
                  <th>Ngày</th>
                  <th>Thời gian</th>
                  <th>Đèn</th>
                  <th>Trạng thái</th>
               </tr> 
               
              </table>
             </div>
           </div>
         </div>
         <div id="sensorPopup${item.id}" class="overlay__popup">
         <div class="popup${item.id}">
           <h2>Nhật ký sensor của ${item.address}</h2>
           <a id="sensorClose${item.id}" class="close" href="#room__row">&times;</a>
           <div id="sensorPopcontent${item.id}" class="content">
            <table id="sensorTable${item.id}" class="tableDiary">
             <tr>
                <th>Ngày</th>
                <th>Thời gian</th>
                <th>Đèn</th>
                <th>Trạng thái</th>
             </tr> 
            </table>
           </div>
         </div>
      </div>
       </div>
     </div>
     </div>`;
        }
        if(lightStatus == false && item.id == 1){
          htmlStr += ` <div class="room__card col-6 ">
          <div class="card " >
          <img class="card-img-top" src="img/${item.imageURL}" alt="Card image cap">
           <div class="card-body">
            <h5 class="card-title">${item.address}</h5>
            <p class="card-text">Trạng thái đèn: <span id='light__sensor${item.id}'' class="light__sensor">OFF</span> <span class="ml-4 card-text">Chế độ nhận diện: <span id="pir__sensor${item.id}" class="pir__sensor" >OFF</span></span></p>
            <div id="light__Button${item.id}" class="button2 light__Button">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           BẬT ĐÈN
         </div>
         <a id="sensorDiary${item.id}" class="  sensor__Button button2" href="#sensorPopup${item.id}">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <i class="fas fa-box"></i>
        </a>
           <a id="diary${item.id}" class=" diary__button button2" href="#popup${item.id}">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <i class="fas fa-book"></i>
         </a>
         <div id="popup${item.id}" class="overlay__popup">
           <div class="popup${item.id}">
             <h2>Nhật ký của ${item.address}</h2>
             <a id="close${item.id}" class="close" href="#room__row">&times;</a>
             <div id="popcontent${item.id}" class="content">
              <table id="table${item.id}" class="tableDiary">
               <tr>
                  <th>Ngày</th>
                  <th>Thời gian</th>
                  <th>Đèn</th>
                  <th>Trạng thái</th>
               </tr> 
               
              </table>
             </div>
           </div>
         </div>
         <div id="sensorPopup${item.id}" class="overlay__popup">
           <div class="popup${item.id}">
             <h2>Nhật ký sensor của ${item.address}</h2>
             <a id="sensorClose${item.id}" class="close" href="#room__row">&times;</a>
             <div id="sensorPopcontent${item.id}" class="content">
              <table id="sensorTable${item.id}" class="tableDiary">
               <tr>
                  <th>Ngày</th>
                  <th>Thời gian</th>
                  <th>Đèn</th>
                  <th>Trạng thái</th>
               </tr> 
              </table>
             </div>
           </div>
        </div>
       </div>
     </div>
     </div>`;
        } 
        if(lightStatus2 == true && item.id == 2){
          htmlStr += ` <div class="room__card col-6 ">
          <div class="card " >
          <img class="card-img-top" src="img/${item.imageURL}" alt="Card image cap">
           <div class="card-body">
            <h5 class="card-title">${item.address}</h5>
            <p class="card-text">Trạng thái đèn: <span id='light__sensor${item.id}'' class="light__sensor">ON</span> <span class="ml-4 card-text">Chế độ nhận diện: <span id="pir__sensor${item.id}" class="pir__sensor" >OFF</span></span></p>
            <div id="light__Button${item.id}" class="button2 light__Button">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           TẮT ĐÈN
         </div>
         <a id="sensorDiary${item.id}" class="  sensor__Button button2" href="#sensorPopup${item.id}">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
         <i class="fas fa-box"></i>
        </a>
           <a id="diary${item.id}" class=" diary__button button2" href="#popup${item.id}">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <i class="fas fa-book"></i>
         </a>
         <div id="popup${item.id}" class="overlay__popup">
           <div class="popup${item.id}">
             <h2>Nhật ký của ${item.address}</h2>
             <a id="close${item.id}" class="close" href="#room__row">&times;</a>
             <div id="popcontent${item.id}" class="content">
              <table id="table${item.id}" class="tableDiary">
               <tr>
                  <th>Ngày</th>
                  <th>Thời gian</th>
                  <th>Đèn</th>
                  <th>Trạng thái</th>
               </tr> 
               
              </table>
             </div>
           </div>
         </div>
         <div id="sensorPopup${item.id}" class="overlay__popup">
         <div class="popup${item.id}">
           <h2>Nhật ký sensor của ${item.address}</h2>
           <a id="sensorClose${item.id}" class="close" href="#room__row">&times;</a>
           <div id="sensorPopcontent${item.id}" class="content">
            <table id="sensorTable${item.id}" class="tableDiary">
             <tr>
                <th>Ngày</th>
                <th>Thời gian</th>
                <th>Đèn</th>
                <th>Trạng thái</th>
             </tr> 
            </table>
           </div>
         </div>
      </div>
       </div>
     </div>
     </div>`;
        } 
         if(lightStatus2 == false && item.id == 2){
          htmlStr += ` <div class="room__card col-6 ">
          <div class="card " >
          <img class="card-img-top" src="img/${item.imageURL}" alt="Card image cap">
           <div class="card-body">
            <h5 class="card-title">${item.address}</h5>
            <p class="card-text">Trạng thái đèn: <span id='light__sensor${item.id}'' class="light__sensor">OFF</span> <span class="ml-4 card-text">Chế độ nhận diện: <span id="pir__sensor${item.id}" class="pir__sensor" >OFF</span></span></p>
            <div id="light__Button${item.id}" class="button2 light__Button">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           BẬT ĐÈN
         </div>
         <a id="sensorDiary${item.id}" class="  sensor__Button button2" href="#sensorPopup${item.id}">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
         <i class="fas fa-box"></i>
         </a>
           <a id="diary${item.id}" class=" diary__button button2" href="#popup${item.id}">
           <span></span>
           <span></span>
           <span></span>
           <span></span>
           <i class="fas fa-book"></i>
          </a>
         <div id="popup${item.id}" class="overlay__popup">
           <div class="popup${item.id}">
             <h2>Nhật ký của ${item.address}</h2>
             <a id="close${item.id}" class="close" href="#room__row">&times;</a>
             <div id="popcontent${item.id}" class="content">
              <table id="table${item.id}" class="tableDiary">
               <tr>
                  <th>Ngày</th>
                  <th>Thời gian</th>
                  <th>Đèn</th>
                  <th>Trạng thái</th>
               </tr> 
               
              </table>
             </div>
           </div>
         </div>
         <div id="sensorPopup${item.id}" class="overlay__popup">
         <div class="popup${item.id}">
           <h2>Nhật ký sensor của ${item.address}</h2>
           <a id="sensorClose${item.id}" class="close" href="#room__row">&times;</a>
           <div id="sensorPopcontent${item.id}" class="content">
            <table id="sensorTable${item.id}" class="tableDiary">
             <tr>
                <th>Ngày</th>
                <th>Thời gian</th>
                <th>Đèn</th>
                <th>Trạng thái</th>
             </tr> 
            </table>
           </div>
         </div>
      </div>
       </div>
     </div>
     </div>`;
        }
      });
      document.getElementById('room__row').innerHTML = htmlStr;
      
    }).then(_ => {
      setButtonClickEvent();
      popUpEvent();
    })
    .catch((err) => {
      console.log(err);
    });
  
})





const totalTimeCalculate = (lamp) => {
  let usingDays = [];
  let arrTime = [];
  let arrDay = [];
  axios({
    method: 'get',
    url: 'http://localhost/smarthome1/api/smarthome/getDataLog',
  }).then((res) => {

    let items = res.data;
    for (let item of items) {
      let days = item.day.slice(0, 10);
      usingDays.push({
        totalTime: 0,
        DateTime: days,
      });
    }
    usingDays = getUniqueListBy(usingDays, 'DateTime');

    for (let d of usingDays) {
      for (let item of items) {
        if (item.day.includes(d.DateTime) && item.lampId == 1) {
          d.totalTime += item.totalTime;
        }
      }
    }
    if (arrDay.length > 5) {
      let overLength = arrDay.length - 5;
      arrDay = arrDay.slice(overLength);
    } else {
      arrDay = arrDay;
    }
    for (let item of usingDays) {
      arrTime.push(item.totalTime);
      arrDay.push(item.DateTime);
    }
    if (arrDay.length > 5) {
      let overLength = arrDay.length - 5;
      arrDay = arrDay.slice(overLength);
    } else {
      arrDay = arrDay;
    }
    console.log(usingDays);

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: arrDay,
        datasets: [
          {
            label: 'Đèn 1',
            data: arrTime,
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
};
const totalTimeCalculate2 = () => {
  let usingDays = [];
  let arrTime = [];
  let arrDay = [];
  axios({
    method: 'get',
    url: 'http://localhost/smarthome1/api/smarthome/getDataLog',
  }).then((res) => {
    let items = res.data;
    for (let item of items) {
      let days = item.day.slice(0, 10);
      if (item.totalTime != 0) {
        usingDays.push({
          totalTime: 0,
          DateTime: days,
        });
      }
    }
    usingDays = getUniqueListBy(usingDays, 'DateTime');
    for (let d of usingDays) {
      for (let item of items) {
        if (item.day.includes(d.DateTime) && item.lampId == 2) {
          d.totalTime += item.totalTime;
        }
      }
    }
    for (let i = 0; i < usingDays.length; i++) {
      if (usingDays[i].totalTime == 0) {
        usingDays.splice(i, 1);
      }
    }

    for (let item of usingDays) {
      arrTime.push(item.totalTime);
      arrDay.push(item.DateTime);
    }
    if (arrDay.length > 5) {
      let overLength = arrDay.length - 5;
      arrDay = arrDay.slice(overLength);
    } else {
      arrDay = arrDay;
    }

    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: arrDay,
        datasets: [
          {
            label: 'Đèn 2',
            data: arrTime,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
};
totalTimeCalculate();
totalTimeCalculate2();

function setButtonClickEvent() {
  let addStatusLampUrl =
    'http://localhost/smarthome1/api/smarthome/AddStatusLamp';
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  document.getElementById('light__Button1').addEventListener('click', () => {
    //Handle time
    let d = new Date();
    if (
      document.getElementById('light__Button1').innerHTML.includes('BẬT ĐÈN')
    ) {
      console.log('Thời gian bắt đầu');
      hStart = d.getHours();
      mStart = d.getMinutes();
      sStart = d.getSeconds();
      today =
        yyyy + '-' + mm + '-' + dd + ' ' + hStart + ':' + mStart + ':' + sStart;
      console.log(today);
      axios({
        method: 'POST',
        url: addStatusLampUrl,
        data: {
          status: 'ON',
          day: today,
          lampId: '1',
        },
      }).then((res) => console.log('post on successful'));
      // console.log(`${hStart}:${mStart}:${sStart}`)
    } else if (
      document.getElementById('light__Button1').innerHTML.includes('TẮT ĐÈN')
    ) {
      console.log('Thời gian tắt')
      hEnd = d.getHours();
      mEnd = d.getMinutes();
      sEnd = d.getSeconds();
      today = yyyy + '-' + mm + '-' + dd + ' ' + hEnd + ':' + mEnd + ':' + sEnd;
      console.log(today)
      axios({
        method: 'POST',
        url: addStatusLampUrl,
        data: {
          status: 'OFF',
          day: today,
          lampId: '1',
        },
      }).then((res) => {

        console.log('post tắt successful');
        const p = CalcTimeUsage(1);
        p.then((_) => {
          document.getElementById('chart1').innerHTML = '';
          document.getElementById(
            'chart1'
          ).innerHTML += ` <canvas id="myChart" width="1000" height="700"></canvas>`;
          totalTimeCalculate();
        });
      });
    }
  });

  document.getElementById('light__Button2').addEventListener('click', () => {
    //Handle time
    let d2 = new Date();
    if (
      document.getElementById('light__Button2').innerHTML.includes('BẬT ĐÈN')
    ) {
      console.log('Thời gian bắt đầu');
      hStart2 = d2.getHours();
      mStart2 = d2.getMinutes();
      sStart2 = d2.getSeconds();
      today =
        yyyy +
        '-' +
        mm +
        '-' +
        dd +
        ' ' +
        hStart2 +
        ':' +
        mStart2 +
        ':' +
        sStart2;
      console.log(today);
      axios({
        method: 'POST',
        url: addStatusLampUrl,
        data: {
          status: 'ON',
          day: today,
          lampId: '2',
        },
      }).then((res) => console.log('post bật successful'));
      // console.log(`${hStart}:${mStart}:${sStart}`)
    } else if (
      
      document.getElementById('light__Button2').innerHTML.includes('TẮT ĐÈN')
    ) {
      console.log('Thời gian tắt');
      hEnd2 = d2.getHours();
      mEnd2 = d2.getMinutes();
      sEnd2 = d2.getSeconds();
      today =
        yyyy + '-' + mm + '-' + dd + ' ' + hEnd2 + ':' + mEnd2 + ':' + sEnd2;
      console.log(today);
      axios({
        method: 'POST',
        url: addStatusLampUrl,
        data: {
          status: 'OFF',
          day: today,
          lampId: '2',
        },
      }).then((res) => {

        console.log('post tắt successful');
        const p = CalcTimeUsage(2);
        p.then((_) => {
          document.getElementById('chart2').innerHTML = '';
          document.getElementById(
            'chart2'
          ).innerHTML += ` <canvas id="myChart2" width="1000" height="700"></canvas>`;
          totalTimeCalculate2();
        });
      });
    }
  });

  //Handle light button
  document.getElementById('light__Button1').addEventListener('click', () => {
    if (lightStatus == false) {
      document.getElementsByClassName('card-img-top')[0].style.opacity = '1';
      document.getElementById('light__Button1').innerHTML = `
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      TẮT ĐÈN`;
      document.getElementById('light__sensor1').innerHTML = 'ON';
      lightStatus = true;
    } else {
      document.getElementsByClassName('card-img-top')[0].style.opacity = '0.5';
      document.getElementById('light__Button1').innerHTML = `
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      BẬT ĐÈN`;
      document.getElementById('light__sensor1').innerHTML = 'OFF';
      lightStatus = false;
    }
  });

  document.getElementById('light__Button2').addEventListener('click', () => {
    if (lightStatus2 == false) {
      document.getElementsByClassName('card-img-top')[1].style.opacity = '1';
      document.getElementById('light__Button2').innerHTML = `
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      TẮT ĐÈN`;
      document.getElementById('light__sensor2').innerHTML = 'ON';
      lightStatus2 = true;
    } else {
      document.getElementsByClassName('card-img-top')[1].style.opacity = '0.5';
      document.getElementById('light__Button2').innerHTML = `
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      BẬT ĐÈN`;
      document.getElementById('light__sensor2').innerHTML = 'OFF';
      lightStatus2 = false;
    }
  });

  // Detector
 
}
const CalcTimeUsage = (roomID) => {

  return new Promise((resolve) => {
    let startToSec, endToSec;
    if (roomID == 1) {
      startToSec = parseInt(hStart) * 60 * 60 + parseInt(mStart) * 60 + parseInt(sStart);
      endToSec = hEnd * 60 * 60 + mEnd * 60 + sEnd;
    } else if (roomID == 2) {
      startToSec = parseInt(hStart2) * 60 * 60 + parseInt(mStart2) * 60 + parseInt(sStart2);
      endToSec = hEnd2 * 60 * 60 + mEnd2 * 60 + sEnd2;
    }
   
    let time = endToSec - startToSec;
    let writeDate = new Date();
    let wDay = String(writeDate.getDate()).padStart(2, '0');
    let mDay = String(writeDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yDay = writeDate.getFullYear();
    writeDate = yDay + '-' + mDay + '-' + wDay;

    // let date = new Date(null);
    // date.setSeconds(time); // specify value for SECONDS here
    // let result = date.toISOString().substr(11, 8);
    if (roomID == 1) {
      hStart = mStart = sStart = hEnd = mEnd = sEnd = 0;
    } else {
      hStart2 = mStart2 = sStart2 = hEnd2 = mEnd2 = sEnd2 = 0;
    }

    console.log(roomID, time);
    axios({
      method: 'post',
      url: 'http://localhost/smarthome1/api/smarthome/AddDataLog',
      data: {
        day: writeDate,
        totalTime: time,
        lampId: roomID,
      },
    }).then((res) => {
      console.log(`Cap nhat thoi gian su dung cua ${roomID}`);
      resolve();
    }).catch(err => {
      console.log('err', err);
      resolve();
    });
  });
};

const popUpEvent = () => {
  document.getElementById('diary1').addEventListener('click', () => {
    axios({
      method: 'get',
      url: 'http://localhost/smarthome1/api/smarthome/getAllStatusLamp',
    }).then((res) => {
      let items = res.data;
      let n = 0;
      for (let item of items) {
        n++;
      }

      for (let i = n - 1; i >= 0; i--) {
        if (items[i].lampId == 1) {
          document.getElementById('table1').innerHTML += `
            <tr>
              <td>${items[i].day.slice(0, 10)} </td>
              <td>${items[i].day.slice(11)}</td>
              <td>${items[i].lampId}</td>
              <td>${items[i].status}</td>
            </tr>
        `;
        }
      }
    });

    document.getElementById('close1').addEventListener('click', () => {
      document.getElementById('table1').innerHTML = `
      <tr>
             <th>Ngày</th>
             <th>Thời gian</th>
             <th>Đèn</th>
             <th>Trạng thái</th>
   </tr> 
      `;
    });
  });

  document.getElementById('diary2').addEventListener('click', () => {
    axios({
      method: 'get',
      url: 'http://localhost/smarthome1/api/smarthome/getAllStatusLamp',
    }).then((res) => {
      let items = res.data;
      let n = 0;
      for (let item of items) {
        n++;
      }

      for (let i = n - 1; i >= 0; i--) {
        if (items[i].lampId == 2) {
          document.getElementById('table2').innerHTML += `
            <tr>
              <td>${items[i].day.slice(0, 10)} </td>
              <td>${items[i].day.slice(11)}</td>
              <td>${items[i].lampId}</td>
              <td>${items[i].status}</td>
            </tr>
        `;
        }
      }
    });
    
    document.getElementById('close2').addEventListener('click', () => {
      document.getElementById('table2').innerHTML = `
      <tr>
             <th>Ngày</th>
             <th>Thời gian</th>
             <th>Đèn</th>
             <th>Trạng thái</th>
   </tr> 
      `;
    });
  });
  document.getElementById('sensorDiary2').addEventListener('click', () => {
    axios({
      method: 'get',
      url: 'http://localhost/smarthome1/api/smarthome/getAllSensor',
    }).then((res) => {
      let items = res.data;
      let n = 0;
      for (let item of items) {
        n++;
      }

      for (let i = n - 1; i >= 0; i--) {
        if (items[i].lampId == 2) {
          document.getElementById('sensorTable2').innerHTML += `
            <tr>
              <td>${items[i].day.slice(0, 10)} </td>
              <td>${items[i].day.slice(11)}</td>
              <td>${items[i].lampId}</td>
              <td>${items[i].status}</td>
            </tr>
        `;
        }
      }
    });
    
    document.getElementById('sensorClose2').addEventListener('click', () => {
      document.getElementById('sensorTable2').innerHTML = `
      <tr>
             <th>Ngày</th>
             <th>Thời gian</th>
             <th>Đèn</th>
             <th>Trạng thái</th>
   </tr> 
      `;
    });
  }); 
  document.getElementById('sensorDiary1').addEventListener('click', () => {
    axios({
      method: 'get',
      url: 'http://localhost/smarthome1/api/smarthome/getAllSensor',
    }).then((res) => {
      let items = res.data;
      let n = 0;
      for (let item of items) {
        n++;
      }

      for (let i = n - 1; i >= 0; i--) {
        if (items[i].lampId == 1) {
          document.getElementById('sensorTable1').innerHTML += `
            <tr>
              <td>${items[i].day.slice(0, 10)} </td>
              <td>${items[i].day.slice(11)}</td>
              <td>${items[i].lampId}</td>
              <td>${items[i].status}</td>
            </tr>
        `;
        }
      }
    });
    
    document.getElementById('sensorClose1').addEventListener('click', () => {
      document.getElementById('sensorTable1').innerHTML = `
      <tr>
             <th>Ngày</th>
             <th>Thời gian</th>
             <th>Đèn</th>
             <th>Trạng thái</th>
   </tr> 
      `;
    });
  }); 
};

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
