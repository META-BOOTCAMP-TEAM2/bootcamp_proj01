/* global kakao */
import React, { useEffect, useState } from "react";
import seoulJson from "../assets/seoul.json";
import busanJson from "../assets/busan.json";
import example from "../assets/example.json";

const { kakao } = window;

const Map = ({ selectedCity, selectedArea, hoveredArea }) => {
  useEffect(() => {
    let data;
    if (selectedCity === "서울특별시") {
      data = seoulJson.features;
    } else {
      data = busanJson.features;
    }

    let polygons = [];
    let map;

    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    let center;
    if (selectedCity === "서울특별시") {
      center = new kakao.maps.LatLng(37.566826, 126.9786567); // 서울 중심 좌표
    } else if (selectedCity === "부산광역시") {
      center = new kakao.maps.LatLng(35.179554, 129.075642); // 부산 중심 좌표
    } else {
      center = new kakao.maps.LatLng(36.38, 127.51);
    }

    const mapOption = {
      center: center,
      level: 9, // 지도의 확대 레벨
    };

    map = new kakao.maps.Map(mapContainer, mapOption);

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 2,
      disableClickZoom: true,
    });

    var markers = [];
    console.log(example);
    console.log(example[0].address);
    for (var i = 0; i < example.length; i++) {
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(example[i].ad[0], example[i].ad[1]),
        map: map,
      });
      marker.userData = {
        address: example[i].address,
        price: example[i].price,
      };
      console.log(marker.userData.address + "hi");

      markers.push(marker);
    }
    console.log(markers);

    clusterer.addMarkers(markers);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
      var markers = cluster.getMarkers();
      var markerInfo = [];

      markers.forEach(function (marker) {
        var info = {
          address: marker.userData.address,
          price: marker.userData.price,
        };
        markerInfo.push(info);
      });
      console.log(typeof markerInfo);

      // markerInfo.forEach(function (info) {
      //   console.log(markerInfo);

      var url = "/lists"; // 이동할 페이지의 URL

      window.open(url);
      // 원하는 방식으로 정보를 표시하는 로직을 추가
      // 예를 들어 정보를 HTML 요소로 동적으로 생성하여 페이지에 추가하는 등의 방법을 사용할 수 있습니다.
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
      const coordinates = val.geometry.coordinates;
      const name = val.properties.name;

      displayArea(coordinates, name);
    });
  }, [selectedArea, selectedCity, hoveredArea]);

  return (
    <div>
      <div id="map" style={{ width: "700px", height: "700px" }}></div>
    </div>
  );
};

export default Map;
