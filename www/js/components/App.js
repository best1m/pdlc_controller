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

    onConnect = () => {
        bluetoothSerial.connect("98:D3:32:10:99:74", res => {
            alert(res);
        }, err => {
            alert(err)
        })
    }

    callListPairedDevices = () => {
        bluetoothSerial.list(res => {
            this.setState({listPairedDevices: res})
        }, err => {
            alert(err);
        });
    }
    test = () => {
        alert('test');
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
                        return <div key={i} onClick="this.onConnect">
                            <input type="radio" value="a" key={i} onChange={this.handleOptionChange}/>
                            <span>이름 : {device.name}, 주소 : {device.address}</span>
                        </div>
                    })
                    : ''}
            <button onClick={this.onConnect}>CONNECT</button>
            {this.state.selectedOption}
            </div>
        )
    }
}

export default App;