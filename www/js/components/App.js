import React, {Component} from 'react';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial';
import '../../scss/main.scss';
import Spinner from "react-md-spinner";
import powerButton from '../../img/power.png';
import increaseButton from '../../img/plus.png';
import decreaseButton from '../../img/minus.png';
import logo from '../../img/logoImage.png';

class App extends Component {

    state = {
        listPairedDevices: [
            {
                name: '...',
                address: '...',
            }
        ],
        loading :false,
        conneted : false,
        test : powerButton
    }

    onIncreaseCount = () => {
        this.onSendData('h');
    }

    onDecreaseCount = () => {
        this.onSendData('l');
    }

    onSwitchOn = () => {
        this.onSendData('o');
    }

    onSwitchOff = () => {
        this.onSendData('f');
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
            this.setState({
                loading : false,
                conneted : true
            });
            alert(`Connnected to ${device.name}`);
        }, err => {
            alert(err)
        })
    }
    onDisConnect = () => {
        bluetoothSerial.disconnect(res => {
            this.setState({
                conneted : false
            })
            alert(res);
        }, err => {
            alert(err);
        })
    }

    render() {
        const {listPairedDevices, loading, conneted} = this.state;
        return (
            <div className="kk-app">
                <div className="kk-main-title">PDLC CONTROLLER</div>
                {/* <button onClick={this.callListPairedDevices}>LIST</button> */}
                {/* {listPairedDevices.length > 0
                    ? listPairedDevices.map((device, i) => {
                        return <div key={i}>
                            <div>이름 : {device.name}, 주소 : {device.address}</div>
                            {conneted != true ? <button onClick={() => this.onConnect(device)}>CONNECT</button> : ''}
                        </div>
                    })
                    : ''} */}
                    <div className="kk-power-button-group">
                        <div className="kk-power-button">
                            <img src={powerButton}/>
                        </div>
                    </div>

                    <div className="kk-volumn-button-group">
                        <div className="kk-volumn-button">
                            <img src={increaseButton}/>
                        </div>
                        <div className="kk-gauge">12</div>
                        <div className="kk-volumn-button kk-minus">
                            <img src={decreaseButton}/>
                        </div>
                    </div>

                    <div className="kk-relay-button-group">
                        <div className="kk-relay-button">A</div>
                        <div className="kk-relay-button">B</div>
                        <div className="kk-relay-button">C</div>
                        <div className="kk-relay-button">D</div>
                    </div>
             
                    <img className="kk-logo" src={logo}/>
                {/* <div className='kk-button-group'>
                    <button className="kk-type-button" onClick={() => this.onSendData('a')}>TYPE A</button>
                    <button className="kk-type-button" onClick={() => this.onSendData('b')}>TYPE B</button>
                    <button className="kk-type-button" onClick={() => this.onSendData('c')}>TYPE C</button>
                    <button className="kk-type-button" onClick={() => this.onSendData('d')}>TYPE D</button>
                </div>

                <div className='kk-button-group'>
                    <button className="kk-type-button" onClick={this.onIncreaseCount}>INCREASE</button>
                    <button className="kk-type-button" onClick={this.onDecreaseCount}>DECREASE</button>
                </div>
                
                <div className='kk-button-group'>
                    <button className="kk-type-button" onClick={this.onSwitchOn}>ON</button>
                    <button className="kk-type-button" onClick={this.onSwitchOff}>OFF</button>
                </div>

                <button className='kk-disconnect-button' onClick={() => this.onDisConnect()}>DISCONNECT</button> */}

                <div className="kk-spinner-wrapper">
                 {loading ? <Spinner size={50}/> : ''}
                </div>
                {loading ? <div className="kk-backdrop"></div> : ''}
            </div>
        )
    }
}

export default App;