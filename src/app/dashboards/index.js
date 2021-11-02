import React from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import BarChart from "./barChart";
import PieChart from "./pieChart";

export default function BasicTextFields() {
  const [datesfromapi, setDatesFromApi] = React.useState([]);
  const [value, setValue] = React.useState([null, null]);
  const [tabledata, setTableData] = React.useState(null);
  const [bardata, setBarData] = React.useState(null);
  const [piedata, setPieData] = React.useState(null);
  React.useEffect(() => {
    createPost();
  }, []);

  function createPost() {
    axios
      .post(
        "https://sigviewauth.sigmoid.io/api/v1/getDateRange",
        {
          organization: "DemoTest",
          view: "Auction",
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.result) {
          const datesapi = [
            new Date(Number(response.data.result.startDate)),
            new Date(Number(response.data.result.endDate)),
          ];
          setDatesFromApi(datesapi);
          setValue(datesapi);
        }
      });
  }

  function callApis() {
    setTableData(null);
    setBarData(null);
    setPieData(null);
    axios
      .post(
        "https://sigviewauth.sigmoid.io/api/v1/getData",
        {
          _id: "dashboard1516252439345",
          emailId: "candidate@sigmoid.com",
          orgViewReq: {
            organization: "DemoTest",
            view: "Auction",
          },
          chartObject: {
            metadata: {
              title: "chartobject:1516252439345",
              img_thumbnail: "../img/chart.png",
              chartType: "table",
              dataLimit: 50,
            },
            requestParam: {
              granularity: "hour",
              timeZone: {
                name: "UTC (+00:00)",
                location: "UTC",
              },
              dateRange: {
                startDate: value[0].getTime().toString(),
                endDate: value[1].getTime().toString(),
              },
              xAxis: ["D044"],
              yAxis: ["M002"],
              approxCountDistinct: [],
              specialCalculation: [],
              filter: [],
              orderBy: {
                metricOrdByList: [
                  {
                    id: "M002",
                    desc: true,
                  },
                ],
              },
              percentCalList: [],
            },
          },
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data && response.data.result) {
          setTableData(response.data.result.data);
        }
      });

    axios
      .post(
        "https://sigviewauth.sigmoid.io/api/v1/getData",
        {
          _id: "dashboard1516252235693",
          emailId: "candidate@sigmoid.com",
          orgViewReq: {
            organization: "DemoTest",
            view: "Auction",
          },
          chartObject: {
            metadata: {
              title: "chartobject:1516252235693",
              img_thumbnail: "../img/chart.png",
              chartType: "bar",
              dataLimit: 50,
            },
            requestParam: {
              granularity: "hour",
              timeZone: {
                name: "UTC (+00:00)",
                location: "UTC",
              },
              dateRange: {
                startDate: value[0].getTime().toString(),
                endDate: value[1].getTime().toString(),
              },
              xAxis: ["D017"],
              yAxis: ["M002"],
              approxCountDistinct: [],
              specialCalculation: [],
              filter: [],
              orderBy: {
                metricOrdByList: [
                  {
                    id: "M002",
                    desc: true,
                  },
                ],
              },
              percentCalList: [],
            },
          },
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data && response.data.result) {
          setBarData(response.data.result.data);
        }
      });

    axios
      .post(
        "https://sigviewauth.sigmoid.io/api/v1/getData",
        {
          _id: "Datastory_ChartId_1535224664111",
          emailId: "candidate@sigmoid.com",
          orgViewReq: {
            organization: "DemoTest",
            view: "Auction",
          },
          chartObject: {
            metadata: {
              title: "",
              img_thumbnail: "images/pie.png",
              chartType: "pie",
              dataLimit: 500,
            },
            text: [],
            requestParam: {
              granularity: "hour",
              timeZone: {
                name: "UTC (+00:00)",
                location: "UTC",
              },
              dateRange: {
                startDate: value[0].getTime().toString(),
                endDate: value[1].getTime().toString(),
              },
              xAxis: ["D005"],
              yAxis: [],
              approxCountDistinct: [],
              specialCalculation: ["CM001"],
              filter: [],
              orderBy: {
                customMetricOrdByList: [
                  {
                    id: "CM001",
                    desc: true,
                  },
                ],
              },
              percentCalList: [
                {
                  id: "CM001",
                },
              ],
            },
          },
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data && response.data.result) {
          setPieData(response.data.result.data);
        }
      });
  }

  return (
    <div>
      <div className="dashboard">
        {datesfromapi[0] ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              clearable
              value={value}
              maxDate={datesfromapi[1]}
              minDate={datesfromapi[0]}
              onChange={(newValue) => {
                console.log(newValue);
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        ) : (
          "Loading"
        )}

        <Button onClick={callApis} variant="contained">
          Search
        </Button>
      </div>

      {bardata && <BarChart data={bardata} />}
      {piedata && <PieChart data={piedata} />}
      {tabledata && (
        <table border="1">
          <tr>
            <th>Impressions Offered</th>
            <th>Publisher Id</th>
          </tr>
          {tabledata &&
            tabledata.map((ele) => (
              <tr>
                <td>{ele.impressions_offered}</td>
                <td>{ele.publisherId}</td>
              </tr>
            ))}
        </table>
      )}
    </div>
  );
}
