import { Platform, PermissionsAndroid, } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import moment from "moment";
import Snackbar from "react-native-snackbar";
import Share from 'react-native-share';

const fRequestAndroidPermission = async () => {
  // Refer to https://reactnative.dev/docs/permissionsandroid for further details on permsissions 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "App1 Permission Request",
        message: "Sauda app needs access to your storage so you can save files to your device.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("permission is granted");
      return true; 
    } else {
      console.log("permission denied");
      return false; 
    }
  } catch (err) {
    console.error("fRequestAndroidPermission error:", err);
    return false; 
  }
};
const generateHTML = (formData) => {
  const { BuyerData, SellerData, date, dynamicFields } = formData;

  // Define the CSS style for the PDF content
  const styles = `
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .header {
        text-align: center;
        font-size: 21px;
      }
      .seller-info, .buyer-info {
        margin: 13px;
        padding: 13px;
        border: 1.3px solid #6ea2eb;
        background-color: #f0f0f0;
        font-size: 18px;
      }
      .dynamic-field {
        margin: 13px;
        padding: 13px;
        border: 1.3px solid #6ea2eb;
        background-color: #f0f0f0;
        font-size: 18px;
      }
      .key {
        color: #6ea2eb;
      }
      .value {
        color: black;
      }
      .date-info{
        margin: 13px;
        padding: 13px;
        border: 1.3px solid #6ea2eb;
        background-color: #f0f0f0;
        font-size: 18px;
      }
      .dynamic-field-container {
        page-break-before: always;
      }
    </style>
  `;

  const dateNow = new Date();
  const currentDate = dateNow.toLocaleDateString('en-GB'); // Format as dd/mm/yyyy
  const currentTime = dateNow.toLocaleTimeString();
  const sauda_date=moment(date).format("DD/MM/YYYY");
  const dynamicFieldsHTML = dynamicFields.map((field, index) => {
    return `
    
      <div class="dynamic-field">
        <p><span class="key">Rate:</span> <span class="value">${field.Rate}</span></p>
        <p><span class="key">Weight:</span> <span class="value">${field.Weight}</span> Kg</p>
        <p><span class="key">Bags:</span> <span class="value">${field.Bags}</span></p>
        <p><span class="key">Bardan:</span> <span class="value">${field.Bardan}</span></p>
        <p><span class="key">Item Type:</span> <span class="value">${field.Item}</span></p>
        <p><span class="key">Payment:</span> <span class="value">${field.Payment}</span></p>
        <p><span class="key">Note:</span> <span class="value">${field.Notes}</span></p>
        <p><span class="key">Quantity:</span> <span class="value">${field.quantity}</span> Kg</p>
    
      </div>
    `;
  }).join('');

  return `
    <html>
      <head>
        ${styles}
      </head>
      <body>
        <div class="header">
        
          <h2>SANMATI/NAVKAR BROKERS</h2>
          <p><span class="key">Print Date:</span> <span class="value">${currentDate}</span>&nbsp;&nbsp;
          <span class="key">Print Time:</span> <span class="value">${currentTime}</span></p>
        </div>
        <div class="date-info">
        <p> <span class="key">Date:</span>${sauda_date}</p>
        </div>
       
        <div class="seller-info">
          <p><span class="key">Seller Name:</span> <span class="value">${SellerData?.companyname}</span> &nbsp;&nbsp;&nbsp;&nbsp; 
          <span class="key">City:</span> <span class="value">${SellerData?.city}</span></p>
          <p><span class="key">Mo No: </span> <span class=""value">${SellerData?.mobile}</span></p>
        </div>
        <div class="buyer-info">
          <p><span class="key">Buyer Name:</span> <span class="value">${BuyerData?.companyname}</span>  &nbsp;&nbsp;&nbsp;&nbsp; 
          <span class="key">City:</span> <span class="value">${BuyerData?.city}</span>
          </p>
          <p><span class="key">Mo No: </span> <span class=""value">${BuyerData?.mobile}</span></p>
        </div>
        
        ${dynamicFieldsHTML}
      </body>
    </html>
  `;
};


const createPDF = async () => {
  // console.log("My fomr state values in the createpdf function is ",formState);
  const formState= {
    "BuyerData": {"address": "Talod", "brokerage": 3, "city": "Talod", "companyname": "Shubham Enterprise ", "customid": "1698927970008141", "gst": "", "mobile": "", "name": "Shubham"}, 
    "SellerData": {"address": "52 ,Market Yard", "brokerage": 2.5, "city": "Talod", "companyname": "Rakeshkumar B Shah", "customid": "1699006725556470", "gst": "", "mobile": "464649", "name": "Rakeshkumar Shah"},
     "date": "2023-11-08T20:40:00+05:30", 
     "dynamicFields": [{"Bags": "220", "Bardan": "Sabardan", "Item": "CottonCake", "Notes": "", "Payment": "Left", "Rate": "2260", "Weight": "50", "buyerbrokerage": 660, "quantity": 11000, "sauda_no": 9, "sellerbrokerage": 550, "unique_id": "1699456201045575"}, {"Bags": "455", "Bardan": "Sabardan", "Item": "CottonCake", "Notes": "", "Payment": "Done", "Rate": "1797", "Weight": "38", "buyerbrokerage": 1365, "quantity": 17290, "sauda_no": 10, "sellerbrokerage": 1137.5, "unique_id": "169945620324758"}]}
  const htmlContent = generateHTML(formState);
  const ab = parseFloat(Math.random() * 10000).toFixed(0);
    const FileName = `SanmatiBrokers${ab}.pdf`;
  let options = {
    html: htmlContent,
    fileName: FileName,
    directory: 'Download',
  };

  if (Platform.OS === "android") {
    const permissionGranted = await fRequestAndroidPermission(); 
    if (!permissionGranted) {
      console.log("access was refused")
      return; 
    }
  }

  let file = await RNHTMLtoPDF.convert(options);
    const destinationPath = RNFS.DownloadDirectoryPath;
  

    const destinationFile = destinationPath + "/" + FileName;
    console.log("Destination path is ",destinationFile);
    RNFS.copyFile(file.filePath, destinationFile)
        .then(result => {
            
            // Delete a file on the project path using RNFS.unlink
            return RNFS.unlink(file.filePath)
                .then(() => {
                    console.log('FILE DELETED');
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch((err) => {
                  Snackbar.show({
                    text: 'Something Went wrong please try again ',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                    textColor: 'white',
                  });
                });
        })
        .catch(err => {
          Snackbar.show({
            text: 'Something Went wrong please try again ',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
            textColor: 'white',
          });
            // console.log('err', err);
        }); 
        console.log("my final file path is ",destinationFile);
        sendPDFToWhatsApp(destinationFile);
};
const sendPDFToWhatsApp = (pdfFilePath) => {
  console.log("My file path contains in sendpdf method",pdfFilePath);
  const shareOptions = {
    title: 'Send PDF via',
    message: 'Check out this PDF!',
    url: `file://${pdfFilePath}`,
    type: 'application/pdf',
  };
  console.log("My share options contains ",shareOptions);
  Share.open(shareOptions)
    .then((res) => {
      console.log('Shared successfully');
    })
    .catch((error) => {
      console.error('Error sharing:', error);
    });
};

export default createPDF;