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
        powerValue : true,
        step : 0,
        aValue : '',
        loading :false,
        conneted : false,
        relayButtons : [
            {value : 'a', label : 'A', activation : false},
            {value : 'b', label : 'B', activation : false},
            {value : 'c', label : 'C', activation : false},
            {value : 'd', label : 'D', activation : false},
        ]
    }

    onIncreaseCount = () => {
        const {step} = this.state;
        if(step < 12){
            this.setState({
                step : step + 1
            })
        }
     
        // this.onSendData('h');
    }

    onDecreaseCount = () => {
        const {step} = this.state;
        if(step > 0){
            this.setState({
                step : step - 1
            })
        }
        // this.onSendData('l');
    }

    onPowerToggle = (value) => {
        const {powerValue} = this.state;
        this.setState({
            powerValue : !powerValue
        })

        if(powerValue){
            this.setState({
                step : 12
            })
            // this.onSendData('o');
        }else{
            this.setState({
                step : 0
            })
            // this.onSendData('f');
        }
    };

    onSendData = (type) => {
        const {relayButtons} = this.state;
        let currentRealyButtons = relayButtons;

        for(var p in currentRealyButtons){
            if(type == currentRealyButtons[p].value){
                currentRealyButtons[p].activation = !currentRealyButtons[p].activation;
            }
        }

        this.setState({
            relayButtons : currentRealyButtons
        })

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
        const {listPairedDevices, loading, conneted, step, relayButtons} = this.state;
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
                        <div className="kk-power-button" onClick={this.onPowerToggle}>
                            <img src={powerButton}/>
                        </div>
                    </div>

                    <div className="kk-volumn-button-group">
                        <div className="kk-volumn-button" onClick={this.onIncreaseCount}>
                            <img src={increaseButton}/>
                        </div>
                        <div className="kk-step">{step}</div>
                        <div className="kk-volumn-button kk-minus" onClick={this.onDecreaseCount}>
                            <img src={decreaseButton}/>
                        </div>
                    </div>

                    <div className="kk-relay-button-group">
                    {relayButtons.map((button, i) => {
                        return <div key={i} className="kk-relay-button" onClick={() => this.onSendData(button.value)}>{button.label}</div>
                    })}
                        {/* <div className="kk-relay-button" onClick={() => this.onSendData('a')}>A</div>
                        <div className="kk-relay-button" onClick={() => this.onSendData('b')}>B</div>
                        <div className="kk-relay-button" onClick={() => this.onSendData('c')}>C</div>
                        <div className="kk-relay-button" onClick={() => this.onSendData('d')}>D</div> */}
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