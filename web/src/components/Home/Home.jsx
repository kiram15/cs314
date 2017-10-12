import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import Select from 'react-select';

class Home extends React.Component {
constructor(props) {
   super(props);
   this.state = {
       svgImage: ''
   };
}

render() {
    var options = [];
    for (var i = 0; i < (this.props.columns.length); i++) {
        var ob = new Object();
        ob.value=this.props.columns[i];
        ob.label=this.props.columns[i];
        options.push(ob);
    }


    let total = this.props.totalDist; //update the total here
    let displaySVG = null;
    if(this.state.svgImage){
        displaySVG = (<div className="svgImage"><img src={this.state.svgImage} width="70%"/></div>);
    }

    return <div className="home-container">
        <div className="inner">

  <h2>T02 NEKA</h2>
            <h3>Itinerary</h3>
            <p></p>
            <div className="app-container">
                <input className="search-button" type="text" id="txtSearch" placeholder="Type what you're searching for here"
                    onSubmit={fetch(document.getElementById("txtSearch"))} autoFocus/>
                <button>Submit</button>
                <br/>
                <h1>
                    {/* In the constructor, this.state.serverReturned.svg is not assigned a value. This means the image
                    will only display once the serverReturned state variable is set to the received json in line 73*/}
                    <img width="75%" src={this.props.serverReturned.svg}/>
                </h1>

            </div>
            <p></p>
            <Dropzone className="dropzone-style" onDrop={this.drop.bind(this)}>
                <button>Open JSON File</button>
            </Dropzone>
            <p></p>

            <h3 className="section-heading">Choose Preferences</h3>
            <div className = "select-value">
                <Select
                    name="form-field-name"
                    options={options}
                    onChange={this.props.onClick}
                    simpleValue = {true}
                    closeOnSelect = {false}
                    multi={true}
                    searchable = {false}
                    backspaceToRemoveMethod=""
                />
            </div>

            <p></p>
            <table className="pair-table">
                <tr>
                    <td><h8><b> Start Name </b></h8></td>
                    <td><h8><b> End Name </b></h8></td>
                    <td><h8><b> Distance (mi) </b></h8></td>
                    <td><h8><b> Total Distance (mi)</b></h8></td>
                </tr>
                {this.props.pairs}
                <tbody>
                    <tr>
                        <td colSpan="4">Total:</td>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
            <p></p>
             <Dropzone className="dropzone-style" onDrop={this.dropSVG.bind(this)}>
                <button>Open SVG Image</button>
             </Dropzone>
             {displaySVG}
        </div>
    </div>
}

drop(acceptedFiles) {
    console.log("Accepting drop");
    acceptedFiles.forEach(file => {
        console.log("Filename:", file.name, "File:", file);
        console.log(JSON.stringify(file));
        let fr = new FileReader();
        fr.onload = (function () {
            return function (e) {
                let JsonObj = JSON.parse(e.target.result);
                console.log(JsonObj);
                this.props.browseFile(JsonObj);
            };
        })(file).bind(this);

        fr.readAsText(file);
    });
}

dropSVG(acceptedFiles) {
    console.log("Accepting SVG drop");
    acceptedFiles.forEach(file => {
        console.log("Filename:", file.name, "File:", file);
        let fr = new FileReader();
        fr.onload = () => this.setState({ svgImage: fr.result })
        (file).bind(this);
        fr.readAsDataURL(file);
    });
 }
}

export default Home
