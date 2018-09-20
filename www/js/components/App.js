import React, {Component} from 'react';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial';
import '../../scss/main.scss'

class App extends Component {
    state = {
        listPairedDevices: [
            {
                name: '이름',
                address: '주소'
            }
        ],
        count : 8
    }

    // componentDidMount(){ }
    onIncreaseCount = () => {
        this.onSendData('h');
    }

    onDecreaseCount = () => {
        this.onSendData('l');
    }

    onSendData = (type) => {
        bluetoothSerial.write(type, res => {
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
        const lineStyle = {marginTop : '20px'}
        return (
            <div className="main">
                <h1>pdlc controller</h1>
                <button onClick={this.callListPairedDevices}>LIST</button>
                {listPairedDevices.length > 0
                    ? listPairedDevices.map((device, i) => {
                        return <div style={lineStyle} key={i}>
                            <div>이름 : {device.name}, 주소 : {device.address}</div>
                            <button onClick={() => this.onConnect(device)}>CONNECT</button>
                        </div>
                    })
                    : ''}
                <div className='kk-button-group'>
                    <button onClick={() => this.onSendData('a')}>TYPE A</button>
                    <button onClick={() => this.onSendData('b')}>TYPE B</button>
                    <button onClick={() => this.onSendData('c')}>TYPE C</button>
                    <button onClick={() => this.onSendData('d')}>TYPE D</button>
                </div>

                <div className='kk-button-group'>
                    <button onClick={this.onIncreaseCount}>INCREASE</button>
                    <button onClick={this.onDecreaseCount}>DECREASE</button>
                </div>

                <button style={lineStyle} onClick={() => this.onDisConnect()}>DISCONNECT</button>

            </div>
        )
    }
}

export default App;