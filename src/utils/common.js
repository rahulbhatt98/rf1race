export const getCardData = ({ type, count }) => {
  let data = {};
  switch (type) {
    case "users":
      data = {
        key: "users",
        title: "Driver Name",
        resultMessage: "Drivers",
        count,
      };
      break;
    case "tracks":
      data = {
        key: "tracks",
        title: "Circuit Name",
        resultMessage: "Tracks",
        count,
      };
      break;
    case "events":
      data = {
        key: "events",
        title: "Event Name",
        resultMessage: "Events",
        count,
      };
      break;
    case "database":
      data = {
        key: "database",
        title: "Circuit Name",
        resultMessage: "Tracks",
        count,
      };
      break;
    case "user-created":
      data = {
        key: "user-created",
        title: "Circuit Name",
        resultMessage: "Tracks",
        count,
      };
      break;
    default:
      break;
  }
  return data;
};
