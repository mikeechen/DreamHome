import React from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer export default class Admin extends React.Component {
  @observable file = [];
  @observable name = '';

  handleChange(e) {
    this.file = e.target.files;
    this.name = e.target.value;
  }

  completeFunction (results) {
    const requests = results.data.map((elm) => {
      const body = {
        status: elm.Stat.substring(2, elm.Stat.length - 1),
        mlsNumber: elm['MLS #'],
        address: elm['Full Address'],
        city: elm.City,
        state: elm.State,
        zip: elm['Zip'],
        price: elm.Price,
        beds: parseInt(elm.Bd),
        baths: parseInt(elm['Total Baths']),
        sqFt: parseInt(elm.SqFt),
        pricePerSqFt: elm['Price/SqFt'],
        yearBuilt: parseInt(elm['Yr Blt']),
        lotSqFt: elm.LotSqft,
        garageType: elm['Garage Type'],
        elementarySchool: elm['Elem School'],
        middleSchool: elm['Middle School'],
        highSchool: elm['High School'],
        listDate: new Date(elm['Listing Date']),
        photo: elm.Photo,
        saleRent: elm['Sale/Rent'],
        listBrokerName: elm['List Broker Name - Agent Name'],
        remarks: elm['Public Remarks']
      };

      return body;
    })
    .filter((elm) => {
      return elm.address;
    })
    .map((elm) => {
      return axios({
        method: 'post',
        url: '/api/listings',
        data: elm
      });
    });

    Promise.all(requests)
      .then((res) => {
        notify.show('Listings updated!', 'success', 3000)
        this.file = [];
        this.name = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitFile(e) {
    e.preventDefault();
    const file = this.file[0];
    const config = {
      delimiter: ',',	// auto-detect
      newline: '',	// auto-detect
      header: true,
      dynamicTyping: false,
      preview: 0,
      encoding: '',
      worker: false,
      comments: false,
      step: undefined,
      complete: this.completeFunction.bind(this),
      error: undefined,
      download: false,
      skipEmptyLines: true,
      chunk: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined
    }
    Papa.parse(file, config)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitFile.bind(this)}>
          <input type="file" value={this.name} onChange={this.handleChange.bind(this)}/>
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
