import React, {Component} from 'react';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial';

class App extends Component {
    state = {
        listPairedDevices: [],
        selectedOption : 'llll'
    }

    handleOptionChange = (e) => {
        this.setState({
            selectedOption : e.currentTarget.value
        })
    }

    callListPairedDevices = () => {
        bluetoothSerial.list(res => {
            this.setState({listPairedDevices: res})
        }, err => {
            alert(err);
        });
    }
    test = (param) => {
        alert(param);
    }

    onConnect = (address) => {
        bluetoothSerial.connect(address, res => {
            alert(res);
        }, err => {
            alert(err)
        })
    }

    render() {
        const {listPairedDevices} = this.state;
        return (
            <div>
                <h1>pdlc controller</h1>
                <button onClick={this.callListPairedDevices}>LIST</button>
                <button>TYPE2</button>
                <button>TYPE3</button>
                {listPairedDevices.length > 0
                    ? listPairedDevices.map((device, i) => {
                        return <div key={i}>
                            <button onClick={() => this.onConnect(device.address)}>이름 : {device.name}, 주소 : {device.address}</button>
                        </div>
                    })
                    : ''}
            </div>
        )
    }
}

export default App;