import moment from 'moment';
import React, { Linking, Share } from 'react-native';
import {} from 'react-native';


const ShareSaudaText=(formData)=>{
console.log("My fomrm Data value contains in the text format method is  ",formData);
const recipientNumber = `+91${formData.SellerData?.mobile || formData.BuyerData?.mobile}`;
console.log("seller number ",recipientNumber);
if (!recipientNumber) {
  console.error("No valid mobile number found.");
  
  return;
}
const formateddate=moment(formData?.date).format('DD/MM/YYYY')
const formattedDynamicFields = formData.dynamicFields.map((field, index) => (
    `Rate: ${field.Rate}
    Bags: ${field.Bags}
    Bardan: ${field.Bardan}
    Item: ${field.Item}
    Payment: ${field.Payment || 'N/A'}
    Notes: ${field.Notes || 'N/A'}
    `
  )).join('\n');

  const message = `Date: ${formateddate}
  Seller: ${formData.SellerData?.companyname}
  Buyer: ${formData.BuyerData?.companyname}
  ${formattedDynamicFields}`;

  console.log("My message contians before the sending is ",message);
  console.log("My seller number contains ",recipientNumber);

try{
  Linking.openURL(`whatsapp://send?text=${encodeURIComponent(message)}&phone=${recipientNumber}`);
}
catch(error)
{
console.log("Error while seding the data ",error);
}

}
export default ShareSaudaText;