import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Link from "@mui/material/Link"; // Import Link component from MUI

export default function PortETA({ portCalls }) {
  const columns = [
    {
      field: "vesselName",
      headerName: "Vessel",
      width: 150,
    },
    {
      field: "radioCallSign",
      headerName: "Identification",
      width: 150,
    },
    {
      field: "nextPort",
      headerName: "Next Port",
      width: 150,
    },
    {
      field: "ata",
      headerName: "Actual Arrival Time",
      width: 200,
      sortComparator: (v1, v2) => {
        // Custom comparator to handle null values and compare dates
        if (v1 === "null") return 1;
        if (v2 === "null") return -1;
        const date1 = new Date(v1);
        const date2 = new Date(v2);
        return date1 - date2;
      },
    },
    {
      field: "eta",
      headerName: "Estimated Arrival Time",
      width: 200,
    },
    {
      field: "location",
      headerName: "Location",
      width: 200,
      renderCell: (params) => {
        return (
          <Link href={params.value} target="_blank" rel="noopener noreferrer">
            View Location
          </Link>
        );
      },
    },
  ];

  const rows = portCalls.map((portCall) => {
    let ata = portCall.portAreaDetails[0].ata;
    let eta = portCall.portAreaDetails[0].eta;

    let ataStr = "";
    let etaStr = "";

    if (ata && typeof ata === "string") {
      ataStr = ata.split(".")[0].replace("T", " ");
    } else {
      ataStr = "null";
    }

    if (eta && typeof eta === "string") {
      etaStr = eta.split(".")[0].replace("T", " ");
    } else {
      etaStr = "null";
    }

    return {
      id: portCall.portCallId,
      radioCallSign: portCall.radioCallSign,
      vesselName: portCall.vesselName,
      nextPort: portCall.nextPort,
      ata: ataStr,
      eta: etaStr,
      location: `https://baltice.org/map/ships/${portCall.radioCallSign}`,
    };
  });

  return (
    <Box sx={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: "ata",
                sort: "desc", // descending order
              },
            ],
          },
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </Box>
  );
}
