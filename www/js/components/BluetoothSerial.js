import bluetoothSerial from 'cordova-plugin-bluetooth-serial';

const BS = {

    listPairedDevices: function () {
        let data;
        bluetoothSerial.list(res => {
            if(res !== undefined){
                data = res;
            }
        }, BS.showError);

        return data;
    },

    showError: error => {
        alert(error);
    }

}

export default BS;