import React, {Component} from 'react';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial';
import '../../scss/main.scss';
import Spinner from "react-md-spinner";

class App extends Component {

    state = {
        listPairedDevices: [
            {
                name: '...',
                address: '...',
            }
        ],
        loading :true,
    }

    getBackdrop = () => {
        if(this.state.loading){
            return {
                opacity : 0.1
            }
        }
    }

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
        this.setState({
            loading : true
        });
        bluetoothSerial.connect(device.address, res => {
            alert(`Connnected to ${device.name}`);
            this.setState({
                loading : false
            });
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
        const {listPairedDevices, loading} = this.state;
        return (
            <div className="kk-app">
                <div className="kk-main-title">pdlc controller</div>
                <button onClick={this.callListPairedDevices}>LIST</button>
                {listPairedDevices.length > 0
                    ? listPairedDevices.map((device, i) => {
                        return <div key={i}>
                            <div>이름 : {device.name}, 주소 : {device.address}</div>
                            <button onClick={() => this.onConnect(device)}>CONNECT</button>
                        </div>
                    })
                    : ''}
                <div className='kk-button-group'>
                    <button className="kk-type-button" onClick={() => this.onSendData('a')}>TYPE A</button>
                    <button className="kk-type-button" onClick={() => this.onSendData('b')}>TYPE B</button>
                    <button className="kk-type-button" onClick={() => this.onSendData('c')}>TYPE C</button>
                    <button className="kk-type-button" onClick={() => this.onSendData('d')}>TYPE D</button>
                </div>

                <div className='kk-button-group'>
                    <button className="kk-type-button" onClick={this.onIncreaseCount}>INCREASE</button>
                    <button className="kk-type-button" onClick={this.onDecreaseCount}>DECREASE</button>
                </div>

                <button className='kk-button-group' onClick={() => this.onDisConnect()}>DISCONNECT</button>

                <div className="kk-spinner-wrapper">
                 {loading ? <Spinner size={50}/> : ''}
                </div>
                <div> className="kk-backdrop"</div>
            </div>
        )
    }
}

export default App;