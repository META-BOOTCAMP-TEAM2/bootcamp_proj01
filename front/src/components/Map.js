// /* global kakao */
// import React, { useEffect } from "react";
// import cityInfo from "./cityInfo";
// import axios from "axios";
// import addressChange from "./addressChange";
// const { kakao } = window;

// const Map = React.memo(({ selectedCity, selectedArea, hoveredArea }) => {
//   useEffect(() => {
//     let data = cityInfo[selectedCity]?.data || [];
//     console.log(data);
//     let polygons = [];
//     let map;
//     let clusterer; // clusterer 변수를 상위 스코프로 이동하여 메모리 관리 개선
//     let center;

//     const mapContainer = document.getElementById("map");

//     const coordinates = cityInfo[selectedCity]?.coordinates || [36.38, 127.51];
//     center = new kakao.maps.LatLng(coordinates[0], coordinates[1]);

//     const mapOption = {
//       center: center,
//       level: 9,
//     };

//     map = new kakao.maps.Map(mapContainer, mapOption);
//     clusterer = new kakao.maps.MarkerClusterer({
//       map: map,
//       averageCenter: true,
//       minLevel: 2,
//       disableClickZoom: true,
//     });

//     const createMarkers = async () => {
//       clusterer.clear();
//       try {
//         const response = await axios.get("/post");
//         let properties = response.data;

//         const markers = await Promise.all(
//           properties.map(async (item) => {
//             // 비동기 처리 개선
//             const position = await addressChange(item.address);
//             const marker = new kakao.maps.Marker({
//               position: new kakao.maps.LatLng(position.lat, position.lng),
//               map: map,
//             });

//             // 필요한 정보만 저장하고 불필요한 정보는 제거하여 메모리 관리 개선
//             marker.userData = {
//               id: item.id,
//               propertyType: item.propertyType,
//               structure: item.structure,
//               options: item.options,
//               address: item.address,
//               price: item.price,
//               deposit: item.deposit,
//               monthlyRent: item.monthlyRent,
//               additionalInfo: item.additionalInfo,
//               filename1: item.filename1,
//               filename2: item.filename2,
//               filename3: item.filename3,
//             };

//             return marker;
//           })
//         );

//         clusterer.addMarkers(markers);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     createMarkers();

//     var zoomControl = new kakao.maps.ZoomControl();
//     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//     kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
//       var markers = cluster.getMarkers();
//       var markerInfo = [];

//       markers.forEach(function (marker) {
//         var info = {
//           id: marker.userData.id,
//           address: marker.userData.address,
//           price: marker.userData.price,
//           deposit: marker.userData.deposit,
//           monthlyRent: marker.userData.monthlyRent,
//           structure: marker.userData.structure,
//           propertyType: marker.userData.propertyType,
//           options: marker.userData.options,
//           additionalInfo: marker.userData.additionalInfo,
//           filename1: marker.userData.filename1,
//           filename2: marker.userData.filename2,
//           filename3: marker.userData.filename3,
//         };

//         markerInfo.push(info);
//       });

//       sessionStorage.setItem("myData", JSON.stringify(markerInfo));
//       window.open("http://localhost:3000/lists");
//     });

//     const displayArea = (coordinates, name) => {
//       let path = [];

//       coordinates[0].forEach((coordinate) => {
//         path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
//       });

//       let fillColor = "white";
//       if (name === hoveredArea) {
//         fillColor = "red";
//       } else if (name === selectedArea) {
//         fillColor = "green";
//       }

//       let polygon = new kakao.maps.Polygon({
//         map: map,
//         path: path,
//         strokeWeight: 2,
//         strokeColor: "black",
//         strokeOpacity: 0.8,
//         strokeStyle: "solid",
//         fillColor: fillColor,
//         fillOpacity: 0.3,
//       });

//       polygons.push(polygon);

//       if (selectedArea === name) {
//         const bounds = new kakao.maps.LatLngBounds();
//         path.forEach((coordinate) => {
//           bounds.extend(coordinate);
//         });
//         map.setBounds(bounds);
//       }
//     };

//     data.forEach((val) => {
//       const name = val.properties.name;
//       if (val.geometry.coordinates.length === 1) {
//         const coordinates = val.geometry.coordinates;

//         displayArea(coordinates, name);
//       } else {
//         for (let i = 0; i < val.geometry.coordinates.length; i++) {
//           const coordinates = val.geometry.coordinates[i];
//           displayArea(coordinates, name);
//         }
//       }
//     });

//     // Cleanup function
//     return () => {
//       polygons.forEach((polygon) => {
//         polygon.setMap(null);
//       });
//       clusterer.clear();
//     };
//   }, [selectedArea, selectedCity, hoveredArea]);

//   return (
//     <div>
//       <div id="map" style={{ width: "700px", height: "700px" }}></div>
//     </div>
//   );
// });

// export default Map;

/* global kakao */
import React, { useEffect } from "react";
import cityInfo from "./cityInfo";
import axios from "axios";
import addressChange from "./addressChange";
const { kakao } = window;

const Map = React.memo(({ selectedCity, selectedArea, hoveredArea }) => {
  useEffect(() => {
    let data = cityInfo[selectedCity]?.data || [];
    console.log(data);
    let polygons = [];
    let map;
    let clusterer; // clusterer 변수를 상위 스코프로 이동하여 메모리 관리 개선
    let center;
    let marker;

    const mapContainer = document.getElementById("map");

    const coordinates = cityInfo[selectedCity]?.coordinates || [36.38, 127.51];
    center = new kakao.maps.LatLng(coordinates[0], coordinates[1]);

    const mapOption = {
      center: center,
      level: 9,
    };

    map = new kakao.maps.Map(mapContainer, mapOption);
    clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 2,
      disableClickZoom: true,
    });

    const createMarkers = async () => {
      try {
        const response = await axios.get("/post");
        let properties = response.data;

        const markers = await Promise.all(
          properties.map(async (item) => {
            const position = await addressChange(item.address);
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(position.lat, position.lng),
              map: map,
              clickable: true,
            });

            marker.userData = {
              id: item.id,
              propertyType: item.propertyType,
              structure: item.structure,
              options: item.options,
              address: item.address,
              price: item.price,
              deposit: item.deposit,
              monthlyRent: item.monthlyRent,
              additionalInfo: item.additionalInfo,
              path1: item.path1,
              path2: item.path2,
              path3: item.path3,
            };

            // 마커 클릭 이벤트 핸들러를 각 마커에 추가
            kakao.maps.event.addListener(marker, "click", function () {
              const newUrl = `http://localhost:3000/listDetail`;
              const newWindow = window.open(newUrl);
              newWindow.sessionStorage.setItem("myData", JSON.stringify(marker.userData));
            });

            return marker;
          })
        );

        clusterer.addMarkers(markers);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    createMarkers();

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
      var markers = cluster.getMarkers();
      var markerInfo = [];

      markers.forEach(function (marker) {
        var info = {
          id: marker.userData.id,
          address: marker.userData.address,
          price: marker.userData.price,
          deposit: marker.userData.deposit,
          monthlyRent: marker.userData.monthlyRent,
          structure: marker.userData.structure,
          propertyType: marker.userData.propertyType,
          options: marker.userData.options,
          additionalInfo: marker.userData.additionalInfo,
          path1: marker.userData.path1,
          path2: marker.userData.path2,
          path3: marker.userData.path3,
        };

        markerInfo.push(info);
      });

      const newUrl = `http://localhost:3000/lists`;
      const newWindow = window.open(newUrl);
      newWindow.sessionStorage.setItem("myData", JSON.stringify(markerInfo));
    });

    const displayArea = (coordinates, name) => {
      let path = [];

      coordinates[0].forEach((coordinate) => {
        path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
      });

      let fillColor = "white";
      if (name === hoveredArea) {
        fillColor = "red";
      } else if (name === selectedArea) {
        fillColor = "green";
      }

      let polygon = new kakao.maps.Polygon({
        map: map,
        path: path,
        strokeWeight: 2,
        strokeColor: "black",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
        fillColor: fillColor,
        fillOpacity: 0.3,
      });

      polygons.push(polygon);

      if (selectedArea === name) {
        const bounds = new kakao.maps.LatLngBounds();
        path.forEach((coordinate) => {
          bounds.extend(coordinate);
        });
        map.setBounds(bounds);
      }
    };

    data.forEach((val) => {
      const name = val.properties.name;
      if (val.geometry.coordinates.length === 1) {
        const coordinates = val.geometry.coordinates;

        displayArea(coordinates, name);
      } else {
        for (let i = 0; i < val.geometry.coordinates.length; i++) {
          const coordinates = val.geometry.coordinates[i];
          displayArea(coordinates, name);
        }
      }
    });

    // Cleanup function
    return () => {
      polygons.forEach((polygon) => {
        polygon.setMap(null);
      });
      clusterer.clear();
    };
  }, [selectedArea, selectedCity, hoveredArea]);

  return (
    <div>
      <div id="map" style={{ width: "700px", height: "700px" }}></div>
    </div>
  );
});

export default Map;
