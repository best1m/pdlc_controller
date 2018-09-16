import React, {Component} from 'react';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial';

class App extends Component {
    state = {
        listPairedDevices: [
            {
                name: '이름',
                address: '주소'
            }
        ]
    }

    // componentDidMount(){ }

    onSendData = () => {
        bluetoothSerial.write("a", res => {
            console.log(res);
        }, err => {
            alert(err)
        });
    }

    callListPairedDevices = () => {
        bluetoothSerial.list(res => {
            this.setState({listPairedDevices: res})
        }, err => {
            alert(err);
        });
    }
    onConnect = (device) => {
        bluetoothSerial.connect(device.address, res => {
            alert(`Connnected to ${device.name}`);
        }, err => {
            alert(err)
        })
    }
    onDisConnect = () => {
        bluetoothSerial.disconnect(res => {
            alert(res);
        }, err => {
            alert(err);
        })
    }

    render() {
        const {listPairedDevices} = this.state;
        return (
            <div>
                <h1>pdlc controller</h1>
                <button onClick={this.callListPairedDevices}>LIST</button>
                {listPairedDevices.length > 0
                    ? listPairedDevices.map((device, i) => {
                        return <div key={i}>
                            <span>이름 : {device.name}, 주소 : {device.address}</span>
                            <button onClick={() => this.onConnect(device)}>CONNECT</button>
                        </div>
                    })
                    : ''}
                <button onClick={() => this.onDisConnect()}>DISCONNECT</button>
                <button onClick={this.onSendData}>send</button>
            </div>
        )
    }
}

export default App;