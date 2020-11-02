import React, { Component } from "react";
import "./records.css";

class Records extends Component {
  state = {
    SL: 0,
    records: [],
    loading: true,
    Header: [{ SL: 0, Date: "Date", Doctor: 0, Diagnosis: 0, Weight: 0 }]
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ SL: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { SL } = this.state;
    this.getData(SL);
  };

  getData = async SL => {
    await fetch(`api/${SL}`)
      .then(response => response.json())
      .then(records =>
        this.setState(
          { records: records, loading: false },
          console.log(records)
        )
      )
      .catch(e => console.log(e));
  };

  renderTableHeader() {
    let header = Object.keys(this.state.Header[0]);
    return header.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  }

  renderTableData() {
    return this.state.records.map((rec, index) => {
      console.log(rec.id);
      return (
        <tr key={rec.id}>
          <td>{rec.id}</td>
          <td>{rec.date}</td>
          <td>{rec.doctor}</td>
          <td>{rec.diagnosis}</td>
          <td>{rec.weight}</td>
        </tr>
      );
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <nav className="app-nav">
            <h1 className="app-title">Patient Records</h1>
          </nav>
          <div className="content">
            <form onSubmit={this.onSubmit}>
              <section
                className="flex select-form-container"
                id="patient-filter"
              >
                <div className="select">
                  <select
                    id="patient-select"
                    value={this.state.SL}
                    onChange={this.onChange}
                  >
                    <option>Select User</option>
                    <option value="1">John Oliver</option>
                    <option value="2">Bob Martin</option>
                    <option value="3">Helena Fernandez</option>
                    <option value="4">Francesco De Mello</option>
                  </select>
                </div>

                <button type="submit" id="submit-btn">
                  Show
                </button>
              </section>
            </form>
          </div>

          <div id="loader-view">
            <section className="loader-container">
              <span className="loader"></span>
            </section>
          </div>
        </div>
      );
    }
    return (
      <div>
        <nav className="app-nav">
          <h1 className="app-title">Patient Records</h1>
        </nav>
        <div className="content">
          <form onSubmit={this.onSubmit}>
            <section className="flex select-form-container" id="patient-filter">
              <div className="select">
                <select
                  id="patient-select"
                  value={this.state.SL}
                  onChange={this.onChange}
                >
                  <option>Select User</option>
                  <option value="1">John Oliver</option>
                  <option value="2">Bob Martin</option>
                  <option value="3">Helena Fernandez</option>
                  <option value="4">Francesco De Mello</option>
                </select>
              </div>

              <button type="submit" id="submit-btn">
                Show
              </button>
            </section>
          </form>
        </div>
        <div>
          <table id="stats">
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Records;
