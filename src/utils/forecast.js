const request=require('request')
const forecast=(latitude,longtitude,callback)=>
{
	const url='http://api.weatherstack.com/current?access_key=4815e2f31be3142e8db31f213bc94020&query='+latitude+','+ longtitude+'&units=f'
 request({url,json:true},(error,{body})=>{
	if(error)
   {
   	  callback('service unavailable',undefined)
   }

   else if(body.error)
   {
   	 callback('unable to find loc',undefined)
   }
   else
   {
         
         
   	 callback(undefined,body.current.weather_descriptions[0]+' until evening . it is currently '+body.current.temperature+' degree out'+' with humidity '+body.current.humidity+' degree.'+'There is '+body.current.precip+'% chance of rain')
   }

})
}

module.exports=forecast