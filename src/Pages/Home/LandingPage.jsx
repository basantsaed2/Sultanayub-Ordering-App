import React, { useEffect, useState } from 'react'
import { FiHome } from "react-icons/fi";
import { MdWork } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { UpdateOrder } from '../../Store/CreateSlices';
import AddButton from '../../Components/Buttons/AddButton';
import { useNavigate, Link } from 'react-router-dom';
import { useDelete } from '../../Hooks/useDelete';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { PiWarningCircle } from "react-icons/pi";
import { MdDeliveryDining } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import SultanayubLogo from '../../assets/Images/SultanayubLogo.png'
import { HeaderNavigate, LoaderLogin, SubmitButton } from '../../Components/Components'
import {setPickupLoctaion,setCategories, setProducts, setProductsDiscount, setProductsDiscountFilter, setProductsFilter, setTaxType} from './../../Store/CreateSlices';
import { useGet } from '../../Hooks/useGet';
// Import your fetchLocations thunk action
import { setLocations } from '../../Store/CreateSlices';
const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(state => state?.order?.data || {});
  const products = useSelector(state => state?.productsCard?.data || []);
  const total = useSelector(state => state?.totalPrice?.data || 0);
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [openDelete, setOpenDelete] = useState(null);

  const orderTypes = useSelector(state => state.checkOutDetails?.data?.order_types || []);
  const allBranches = useSelector(state => state.checkOutDetails?.data?.branches || []);
  const allLocations = useSelector(state => state.location.data || []);
  const [orderTypeSelected, setOrderTypeSelected] = useState(orderTypes[0]?.type || '');
  const [orderTypeId, setOrderTypeId] = useState(orderTypes[0]?.id || null);

  const [brancheId, setBrancheId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [deliveryPrice, setDeliveryPrice] = useState('');
  const { refetch: refetchProducts, loading: loadingProducts, data: dataProducts } = useGet({
    url: 'https://sultanayubbcknd.food2go.online/customer/home/web_products',
 });
 
 useEffect(() => {
    if (brancheId || locationId) {
        dispatch(setPickupLoctaion(brancheId? brancheId : locationId));
        refetchProducts();
    }
 }, [brancheId, locationId]);
 
 useEffect(() => {
    if (dataProducts) {
       console.log("NOW YOUR Products", dataProducts);
       dispatch(setTaxType(dataProducts?.tax || null));
       dispatch(setProducts(dataProducts?.products || null));
       dispatch(setProductsFilter(dataProducts?.products || null));
       dispatch(setCategories(dataProducts?.categories || null));
       dispatch(setProductsDiscount(dataProducts?.discounts || null));
       dispatch(setProductsDiscountFilter(dataProducts?.discounts || null));
    }
 }, [dataProducts]);
 

  useEffect(() => {
    if (orderTypes.length > 0) {
      console.log("orddd", orderTypes);
      setOrderTypeSelected(orderTypes[0].type);
      setOrderTypeId(orderTypes[0].id);
    }
  }, [orderTypes]);

  useEffect(() => { console.log('locations', allLocations) }, [allLocations]);
  useEffect(() => { console.log('orderTypeSelected', orderTypeSelected) }, [orderTypeSelected]);
  useEffect(() => { console.log('orderTypeId', orderTypeId) }, [orderTypeId]);
  useEffect(() => { console.log('brancheId', brancheId) }, [brancheId]);
  useEffect(() => { console.log('allLocations', allLocations) }, [allLocations]);

  useEffect(() => {
    dispatch(UpdateOrder({
      ...order,
      order_type: orderTypeSelected,
      branch_id: brancheId,
      address_id: locationId,
      delivery_price: deliveryPrice,
      amount: Number(total) + Number(deliveryPrice || 0),
    }));
  }, [orderTypeId, brancheId, locationId]);

  const handleAddAddress = () => {
    navigate("/check_out/add_address"); // Update with your actual route
  };

  const handleOpenDelete = (item) => {
    setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  // Delete location and then refetch locations
       const handleDelete = async (id, name) => {
       const success = await deleteData(`https://sultanayubbcknd.food2go.online/customer/address/delete/${id}`, `${name} Deleted Success.`);
       if (success) {
         // Filter out the deleted location and update the Redux state
         const updatedLocations = allLocations.filter(location => location.id !== id);
         dispatch(setLocations(updatedLocations));
       }
       };

       const GoToMenu =()=>{
        navigate("/menu"); // Update with your actual route
       }
     

  return (
    <>
    <div className='w-full flex flex-col gap-3 mb-5'>
        <div className="w-full flex flex-col lg:flex-row gap-5 p-4">

            {/* Navbar Type Order */}
            <div className="w-full lg:w-1/2 flex flex-col gap-5 justify-center gap-x-3">
                <h1 className='text-2xl font-semibold'>PickUP Or Delivery</h1>

                <div className="w-full flex items-center gap-x-3">
                    {orderTypes.map((type) => (
                    type.status === 1 && (
                        <span
                        key={type.id}
                        className={`flex w-64 h-64 flex-col items-center justify-center gap-2 text-2xl font-TextFontRegular px-4 py-2 rounded-lg cursor-pointer border-2 border-mainColor transition-all ease-in-out duration-300
                            ${orderTypeSelected === type.type ? 'text-white bg-mainColor ' : 'text-mainColor bg-white hover:bg-mainColor hover:text-white'}`}
                        onClick={() => {
                            setOrderTypeSelected(type.type);
                            setOrderTypeId(type.id);
                        }}
                        >
                        {/* Display appropriate icon based on type */}
                        {type.type.charAt(0).toUpperCase()+ type.type.slice(1) === "Delivery" ? <MdDeliveryDining size={64} /> : null}
                        {type.type.charAt(0).toUpperCase()+ type.type.slice(1) === "Take_away" ? <GiMeal size={64} /> : null}

                        {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                        </span>
                    )
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-5 justify-center gap-x-3">
            {/* Add New Address button */}
            {/* {orderTypeId === 3 && (
            <div className='w-full flex justify-center'>
                <AddButton handleClick={handleAddAddress} text="Add New Address" BgColor='mainColor' Color='white' iconColor='white' />
            </div>
            )} */}

            {/* Locations */}
            {orderTypeId === 3 && (
            <>
                <h2 className="text-3xl font-extrabold relative">
                <span className="px-4 pb-2 inline-block text-mainColor from-mainColor to-secondaryColor border-b-4 border-mainColor">
                    Select Address
                </span>
                </h2>
                <div className='w-full flex '>
                <AddButton handleClick={handleAddAddress} text="Add New Address" BgColor='mainColor' Color='white' iconColor='white' />
            </div>
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-3">
                {allLocations.map((location) => (
                    <div key={location.id} className="relative">
                    <div
                        className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 shadow-md border 
                        ${locationId === location.id 
                            ? 'bg-mainColor text-white' 
                            : 'bg-white text-mainColor border-mainColor hover:bg-mainColor hover:text-white'}`}
                        onClick={() => {
                        setLocationId(location.id);
                        setBrancheId('');
                        setDeliveryPrice(location?.zone?.price || '');
                        }}
                    >
                        <div className="flex-shrink-0">
                        {location.type === 'Home' ? (
                            <FiHome className="w-10 h-10" />
                        ) : (
                            <MdWork className="w-10 h-10" />
                        )}
                        </div>
                        <div className="flex flex-col text-sm space-y-1 h-36 overflow-hidden">
                        <span className="line-clamp-2">
                            <strong>Address:</strong> {location.address?.charAt(0).toUpperCase() + location.address?.slice(1)}
                        </span>
                        <span className="truncate">
                            <strong>Building:</strong> {location.building_num?.charAt(0).toUpperCase() + location.building_num?.slice(1) || '-'}
                        </span>
                        <span className="truncate">
                            <strong>Floor:</strong> {location.floor_num?.charAt(0).toUpperCase() + location.floor_num?.slice(1) || '-'}
                        </span>
                        <span className="truncate">
                            <strong>Apt:</strong> {location.apartment?.charAt(0).toUpperCase() + location.apartment?.slice(1) || '-'}
                        </span>
                        <span className="line-clamp-1">
                            <strong>Extra:</strong> {location.additional_data?.charAt(0).toUpperCase() + location.additional_data?.slice(1) || '-'}
                        </span>
                        <div className="mt-2 border-t border-gray-200 pt-2 flex items-center justify-between">
                            <span className="text-xs font-semibold">Action:</span>
                            <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDelete(location.id);
                                }}
                                className="transition-colors hover:text-red-600"
                            >
                                <MdDelete size="24" />
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    {openDelete === location.id && (
                        <Dialog
                        open={true}
                        onClose={handleCloseDelete}
                        className="relative z-10"
                        >
                        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <PiWarningCircle size="60" />
                                <div className="mt-2 text-center">
                                    You will delete location {location?.address || "-"}
                                </div>
                                </div>
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                    onClick={() => handleDelete(location.id, location?.address)}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={handleCloseDelete}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                                </div>
                            </DialogPanel>
                            </div>
                        </div>
                        </Dialog>
                    )}
                    </div>
                ))}
                </div>
            </>
            )}

            {/* Branches */}
            {(orderTypeId === 1 || orderTypeId === 2) && (
            <div className="w-full flex flex-col items-start justify-evenly gap-3">
                <h1 className='text-2xl font-semibold'>Select Branch</h1>
                {allBranches.map((branche) => (
                <div
                    key={branche.id}
                    className={`w-full flex items-center justify-start gap-x-3 text-xl font-TextFontRegular px-3 py-3 rounded-xl cursor-pointer border-2 border-mainColor transition-all ease-in-out duration-300
                    ${brancheId === branche.id ? 'text-white bg-mainColor ' : 'text-black bg-gray-50 hover:bg-mainColor hover:text-white'}`}
                    onClick={() => {
                    setBrancheId(branche.id);
                    setDeliveryPrice('');
                    setLocationId('');
                    }}
                >
                    <img
                    src={branche?.image_link || ''}
                    alt={branche?.name || 'Branch Image'}
                    className={`w-20 h-20 rounded-full ${brancheId === branche?.id ? 'border-2 border-white' : 'border-2 border-mainColor'} object-cover object-center`}
                    />
                    <div className="flex flex-col items-start justify-center">
                    <span className='sm:text-lg xl:text-xl font-TextFontRegular'>
                    {branche.name.charAt(0).toUpperCase() + branche.name.slice(1)}
                    </span>
                    <span className='sm:text-md xl:text-lg font-TextFontRegular'>
                        {branche.address.charAt(0).toUpperCase() + branche.address.slice(1)}
                    </span>
                    </div>
                </div>
                ))}
            </div>
            )}
            </div>
        </div>

        <div className="w-full flex items-center justify-center">
            <div className="">
                <SubmitButton handleClick={GoToMenu} text={'Done'} px ="px-20"/>
            </div>
        </div>
    </div>
    </>
  );
};

export default LandingPage;
