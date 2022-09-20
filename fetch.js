
const load = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data)
    return data;
}

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}
const getProvince = async () => {
    const {data} = await load();
    const province = data.map(item => item.province).filter(unique)
    return province
}

const getCity = async (province) => {
    const {data} = await load();
    const city = data.filter(item => item.province === province).map(item => item.city).filter(unique)
    return city
}

const getDistrict = async (city) => {
    const {data} = await load();
    const district = data.filter(item => item.city === city).map(item => item.district).filter(unique)
    return district
}
const getSubDistrict = async (district) => {
    const {data} = await load();
    const subDistrict = data.filter(item => item.district === district).map(item => item.subdistrict).filter(unique)

    return subDistrict
}

const getPostalCode = async (subDistrict) => {
    const {data} = await load();
    const postalCode = data.find (item => item.subdistrict === subDistrict).postal_code
    return postalCode
}

