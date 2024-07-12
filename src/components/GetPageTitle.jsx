export const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/":
      return "Dashboard";

    case "/requests":
      return "Requests";

    case "/accepted-requests":
      return "Accepted Requests";

    case "/trips":
      return "Trips";

    case `/transactions`:
      return "Transactions";

    case "/transport-control":
      return "Transport Control";

    case "/transport-control/trucks":
      return `<span style=color:grey;font-weight:400>Transport Control /</span> <span style=font-weight:bold;>Trucks </span>`;

    case "/transport-control/issue-report":
      return `<span style=color:grey;font-weight:400>Transport Control /</span> <span style=font-weight:bold;>Issue Report </span>`;

    case "/settings":
      return "Settings";

    default:
      return "Details";
  }
};
