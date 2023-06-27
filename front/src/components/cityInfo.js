import seoulJson from "../assets/seoul.json";
import busanJson from "../assets/busan.json";
import incheonJson from "../assets/incheon.json";
import ulsanJson from "../assets/ulsan.json";
import daeguJson from "../assets/daegu.json";
import gwangjuJson from "../assets/gwangju.json";
import daejunJson from "../assets/daejun.json";

const cityInfo = {
  서울특별시: {
    data: seoulJson.features,
    coordinates: [37.566826, 126.9786567],
  },
  부산광역시: {
    data: busanJson.features,
    coordinates: [35.179554, 129.075642],
  },
  인천광역시: {
    data: incheonJson.features,
    coordinates: [37.4562557, 126.7052062],
  },
  울산광역시: {
    data: ulsanJson.features,
    coordinates: [35.5383773, 129.3113596],
  },
  대구광역시: {
    data: daeguJson.features,
    coordinates: [35.8714354, 128.601445],
  },
  광주광역시: {
    data: gwangjuJson.features,
    coordinates: [35.1595454, 126.8526012],
  },
  대전광역시: {
    data: daejunJson.features,
    coordinates: [36.3504119, 127.3845475],
  },
};

export default cityInfo;
