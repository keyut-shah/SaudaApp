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
const generateHTML = (formData, PartyName) => {
    const currentDate = new Date().toLocaleDateString('en-GB');
    const currentTime = new Date().toLocaleTimeString();


    let htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
          }


          h2 {
              text-align: center;
          }

          table {
              width: 100%;
              border-collapse: collapse;
          }

          table, th, td {
              border: 1px solid #000;
          }

          th, td {
              padding: 10px;
              text-align: left;
          }

          th {
              background-color: #6ea2eb;
              color: white;
          }
          .party-info {
            text-align: center; /* Center align ABC Brokers */
            font-size: 58px; /* Adjust font size for ABC Brokers (largest string) */
            margin-bottom: 20px; /* Add margin to create space between ABC Brokers and the table */
        }

        .party-details {
            font-size: 24px;
            margin-bottom: 20px;
            display: flex;
          }
        
          .party-details span {
            display: inline-block;
          }
        
          .party-name {
            margin-right: 20px; /* Adjust the margin as needed */
          }
        
          .party-details span:last-child {
            flex-grow: 1; /* Allow the last span to take up remaining space */
          }
        .party-wise,
        .date-time {
          display: inline-block;
          width: 50%;
        }
        .totals-table {
            margin-top: 10px;
          }

          .totals-table td {
            text-align: center;
          }

          .end-of-report {
            text-align: right;
            margin-top: 10px;
          }
      </style>
  </head>
  <body>
  <h2> 
  <span class="party-wise"> Party Wise Summary Report </span>
  <span class="date-time">Print Date: ${currentDate} &nbsp;&nbsp; ${currentTime}</span>
  </h2>
  <div class="party-info">
      SANMATI / NAVKAR BROKERS
  </div>
 
  <div class="party-details">
  <span class="party-name">Party Name: ${PartyName.companyname}</span>
  <span>City: ${PartyName.city}</span>
</div>
  <div class="party-details">
  <span class="party-name"> Contact Person: ${PartyName.name}</span>
   <span >Mobile: ${PartyName.mobile}</span>
  </div>
      
      <table>
          <thead>
              <tr>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Party</th>
                  <th>City</th>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Rate</th>
                  <th>Quantity</th>
                  <th>Bags</th>
                  <th>Brokerage Rate</th>
                  <th>Total Brokerage</th>
              </tr>
          </thead>
          <tbody>
`;
let totalQuantity = 0;
let totalBags = 0;
let totalBrokerage = 0;

    formData.forEach((item, index) => {
        const partyName = PartyName.companyname;
        
    
        const displayedPartyName =
          partyName === item.BuyerData?.companyname
            ? item.SellerData?.companyname
            : item.BuyerData?.companyname;
    
        const displayedCity =
          partyName === item.BuyerData?.companyname
            ? item.SellerData?.city 
            : item.BuyerData?.city ;

            const Type=   
            partyName === item.BuyerData?.companyname
             ?'Buy'
             :'Sell';

         const currenttotalbrokerage=PartyName?.brokerage*parseInt(item.Bags) ;
    totalQuantity += item.quantity;
    totalBags += parseInt(item.Bags);
    totalBrokerage +=currenttotalbrokerage;

        htmlContent += `
      <tr>
          <td>${index + 1}</td>
          <td>${new Date(item.date).toLocaleDateString('en-GB')}</td>
          <td>${displayedPartyName}</td>
          <td>${displayedCity}</td>
          <td>${item.Item}</td>
          <td>${Type}</td>
          <td>${item.Rate}</td>
          <td>${item.quantity}</td>
          <td>${item.Bags}</td>
          <td>${PartyName?.brokerage}</td>
          <td>${currenttotalbrokerage}</td>
      </tr>
  `;
    });
console.log("Total Brokerage is ",totalBrokerage);
console.log("total bags",totalBags);
console.log("total quantity",totalQuantity);
    htmlContent += `
          </tbody>
      </table>
      <table class="totals-table">
      <tr>
        <td>Total Quantity:</td>
        <td>${totalQuantity}</td>
        <td>Total Bags:</td>
        <td>${totalBags}</td>
        <td>Total Brokerage:</td>
        <td>${totalBrokerage}</td>
      </tr>
    </table>
    <div class="end-of-report">End of the report</div>
     
  </body>
  </html>
`;

    return htmlContent;

};


const statementandsharepdf = async (formState, searchQuery) => {
    console.log("My fomr state values in the createpdf function is ", formState);
    // const formState= {
    //   "BuyerData": {"address": "Talod", "brokerage": 3, "city": "Talod", "companyname": "Shubham Enterprise ", "customid": "1698927970008141", "gst": "", "mobile": "", "name": "Shubham"}, 
    //   "SellerData": {"address": "52 ,Market Yard", "brokerage": 2.5, "city": "Talod", "companyname": "Rakeshkumar B Shah", "customid": "1699006725556470", "gst": "", "mobile": "464649", "name": "Rakeshkumar Shah"},
    //    "date": "2023-11-08T20:40:00+05:30", 
    //    "dynamicFields": [{"Bags": "220", "Bardan": "Sabardan", "Item": "CottonCake", "Notes": "", "Payment": "Left", "Rate": "2260", "Weight": "50", "buyerbrokerage": 660, "quantity": 11000, "sauda_no": 9, "sellerbrokerage": 550, "unique_id": "1699456201045575"}, {"Bags": "455", "Bardan": "Sabardan", "Item": "CottonCake", "Notes": "", "Payment": "Done", "Rate": "1797", "Weight": "38", "buyerbrokerage": 1365, "quantity": 17290, "sauda_no": 10, "sellerbrokerage": 1137.5, "unique_id": "169945620324758"}]}

    let PartyName = findAndReturn(formState, searchQuery);

    console.log("PartyName is ", PartyName);

    const htmlContent = generateHTML(formState, PartyName);
    const ab = parseFloat(Math.random() * 10000).toFixed(0);
    const FileName = `SanmatiBrokers${ab}.pdf`;
    let options = {
        html: htmlContent,
        fileName: FileName,
        directory: 'Download',
        height: 992, 
        width: 612, 
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
    console.log("Destination path is ", destinationFile);
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
    console.log("my final file path is ", destinationFile);
    sendPDFToWhatsApp(destinationFile);
};
const findAndReturn = (dataArray, partyname) => {
    // Check if dataArray is not empty

    if (dataArray.length > 0) {
        // Get the first object in the array
        const firstObject = dataArray[0];

        // Check if the "companyname" of BuyerData or SellerData includes "Key"
        if (
            firstObject.BuyerData &&
            firstObject.BuyerData.companyname &&
            firstObject.BuyerData.companyname.includes(partyname)
        ) {
            // If found, store in a variable and return
            const PartyData = firstObject.BuyerData
            return PartyData;
        } else if (
            firstObject.SellerData &&
            firstObject.SellerData.companyname &&
            firstObject.SellerData.companyname.includes(partyname)
        ) {
            // If found, store in a variable and return
            const PartyData = firstObject.SellerData;
            return PartyData;
        } else {
            // If not found, return null or handle accordingly
            return null;
        }
    } else {
        // Handle the case where dataArray is empty
        return null;
    }
};

const sendPDFToWhatsApp = (pdfFilePath) => {
    console.log("My file path contains in sendpdf method", pdfFilePath);
    const shareOptions = {
        title: 'Send PDF via',
        message: 'Check out this PDF!',
        url: `file://${pdfFilePath}`,
        type: 'application/pdf',
    };
    console.log("My share options contains ", shareOptions);
    Share.open(shareOptions)
        .then((res) => {
            console.log('Shared successfully');
        })
        .catch((error) => {
            console.log("Error while sharing file ", error);
            //   console.error('Error sharing:', error);
        });
};

export default statementandsharepdf;