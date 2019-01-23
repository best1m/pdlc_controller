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
        powerValue : true,
        dimmingCount : 0,
        loading :false,
        conneted : false,
        relayButtons : [
            {value : 'a', label : 'A', activation : false},
            {value : 'b', label : 'B', activation : false},
            {value : 'c', label : 'C', activation : false},
            {value : 'd', label : 'D', activation : false},
        ]
    }


    onConnect = () => {


        this.setState({
            loading : true
        });

        bluetoothSerial.isEnabled(
            res => {
            }, 
            err => {
                alert('블루투스를 활성화 하세요.');
                this.setState({
                    loading : false,
                });
        });

        bluetoothSerial.list(res => {

        for(var p in res){
            if(res[p].name.indexOf('SFMKPDLCAPP') > -1){
            const device = res[p];
            bluetoothSerial.connect(device.address, res => {
                this.setState({
                    loading : false,
                    conneted : true
                });
                // alert(`Connnected to ${device.name}`);
            }, err => {
                alert(err);
                this.setState({
                    loading : false,
                    conneted : false
                });
            })
            }
        }


        }, err => {
            alert(err);
        });

    
    }

    onIncreaseCount = () => {
        const {dimmingCount} = this.state;
        if(dimmingCount < 12){
            this.setState({
                dimmingCount : dimmingCount + 1
            })
        }
     
        this.onSendData('h');
    }

    onDecreaseCount = () => {
        const {dimmingCount} = this.state;
        if(dimmingCount > 0){
            this.setState({
                dimmingCount : dimmingCount - 1
            })
        }
        this.onSendData('l');
    }

    onPowerToggle = (value) => {

        const {powerValue} = this.state;
        this.setState({
            powerValue : !powerValue
        })

        if(powerValue){
            this.setState({
                dimmingCount : 12
            })
            this.onSendData('o');
        }else{
            this.setState({
                dimmingCount : 0
            })
            this.onSendData('f');
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
        console.log(relayButtons);

        bluetoothSerial.write(type, res => {
            console.log(res);
        }, err => {
            alert(err)
        });
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
        const {loading, conneted, dimmingCount, relayButtons} = this.state;
        const activationStyle = {color : '#00e600'}
        return (
            <div className="kk-app">
                <div className="kk-main-title">PDLC CONTROLLER</div>

                 {/* <button onClick={this.getListPairedDevices}>LIST</button>
                {
                    listPairedDevices.length > 0
                    ? listPairedDevices.map((device, i) => {
                        return <div key={i}>
                            <div>이름 : {device.name}, 주소 : {device.address}</div>
                            {conneted != true ? <button onClick={() => this.onConnect(device)}>CONNECT</button> : ''}
                        </div>
                    }) : ''
                    
                }  */}
                    
                    <div className="kk-power-button-group">
                        <div className="kk-power-button" onClick={this.onPowerToggle}>
                            <img src={powerButton}/>
                        </div>
                    </div>

                    <div className="kk-volumn-button-group">
                         <div className="kk-volumn-button kk-minus" onClick={this.onDecreaseCount}>
                            <img src={decreaseButton}/>
                         </div>
                        <div className="kk-dimmingCount">{dimmingCount}</div>
                        <div className="kk-volumn-button" onClick={this.onIncreaseCount}>
                            <img src={increaseButton}/>
                       </div>
                    
                    </div>

                    <div className="kk-relay-button-group">
                    {relayButtons.map((button, i) => {
                        return <div key={i} className="kk-relay-button" onClick={() => this.onSendData(button.value)} style={button.activation ? activationStyle : {}}>
                                {button.label}
                               </div>
                    })}
                    </div>
             
                    <img className="kk-logo" src={logo}/>

                <div className="kk-spinner-wrapper">
                 {loading ? <Spinner size={50}/> : ''}
                </div>
                {loading ? <div className="kk-backdrop"></div> : ''}

                {!conneted ? <div className="kk-firstStepPage">
                    <div className="kk-inner-container">
                        <div className="kk-inner-box">
                            <div className="kk-connect-button" onClick={this.onConnect}>CONNECT</div>
                            <div className="kk-title">실행전에 설정에서 블루투스를 활성화 하세요.</div>
                        </div>
                    </div>
                </div> : ''}
            </div>
        )
    }
}

export default App;