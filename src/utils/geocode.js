const request=require('request')
const geocode=(address,callback)=>
{
	const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia3Jpc2huYW4xOTkiLCJhIjoiY2thbDB1dGRmMHBuZDJ0cDZna3c2aTlwZyJ9.78g3G84abQD85xs-ZMGs1g&limit=1'
 request({url,json:true},(error,{body})=>{
	if(error)
   {
   	  callback('service unavailable',undefined)
   }

   else if(body.features.length===0)
   {
   	 callback('unable to find loc',undefined)
   }
   else
   {
   	  callback(undefined,{
   	  	lat: body.features[0].center[1],
   	  	long: body.features[0].center[0],
   	  	loc: body.features[0].place_name
   	  })
   }

})
}

module.exports=geocode