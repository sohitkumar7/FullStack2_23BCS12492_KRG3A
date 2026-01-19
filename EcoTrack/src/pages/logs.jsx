const logs = ({ logs }) => {
  return (
    <ul>
      <li>
        High Carbon Activity:{" "}
        {logs
          .filter((log) => log.carbon > 4)
          .map((log) => log.activity)
          .join(", ")}
      </li>
    </ul>
  );
};

export default logs;
