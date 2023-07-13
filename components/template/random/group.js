import { useEffect, useState, useCallback } from "react";
import Refresh from "../../../public/images/refresh.svg";

export default function Group({ group, triggerRefresh }) {
  const [values, setValues] = useState(null);
  const [triggerSoloRefresh, setTriggerSoloRefresh] = useState(true);
  const [data, setData] = useState(null);

  const getRandomValues = useCallback(() => {
    const values = [];
    for (let i = 0; i < data.randomCount; i++) {
      let random = data.values.random();
      while (values.includes(random)) {
        random = data.values.random();
      }
      values.push(random);
    }
    return values;
  }, [data]);

  const getUnique = (values) => {
    return [...new Set(values)];
  };

  useEffect(() => {
    if (group && !data) {
      setData(group);
    }
  }, [group, data]);

  useEffect(() => {
    if (data) setValues(getRandomValues());
  }, [data, setValues, triggerRefresh, triggerSoloRefresh, getRandomValues]);

  if (!data) return null;

  return (
    <div className="group">
      <div className="header">
        <div className="random-count">
          <input
            type="number"
            min={0}
            max={Math.min(5, getUnique(data.values).length)}
            onChange={(event) =>
              setData((_data) => ({
                ..._data,
                randomCount: Math.min(
                  event.target.value,
                  Math.min(5, getUnique(data.values).length)
                ),
              }))
            }
            value={data.randomCount}
          />
        </div>
        <div className="name">{data.name}</div>
        <div
          className="btn-solo-refresh"
          onClick={() => setTriggerSoloRefresh((state) => !state)}
        >
          <Refresh />
        </div>
      </div>
      <div className="values">
        {values &&
          values.map((value, i) => {
            return (
              <div key={i} className="value">
                {value}
              </div>
            );
          })}
      </div>
    </div>
  );
}
