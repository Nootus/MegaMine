//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using eMine.Controllers;
//using eMine.Models;
//using eMine.Models.Fleet;
//using eMine.Lib.Domain;
//using eMine.Lib.Shared;
//using eMine.Models.Shared;

//namespace eMine.UnitTests
//{
//    public class VehicleTestCases
//    {
//        // Vehicle Save method
//        public void TestVehicleSave()
//        {

//        }


//        public void TestVehicleNew()
//        {

//        }

//        public void TestVehicleGet()
//        {
//            FleetController vf = new FleetController();
//            AjaxModel<VehicleServiceViewModel>  av = vf.VehicleServiceGet(1);
//            DateTime? dtSvc = av.Model.ServiceDate;
//        }

//        public void TestVehicleDelete()
//        {

//        }

//        public void TestVehicleUpdate()
//        {

//        }

//        public void test()
//        {
//            AjaxModel<string> ajax;

//            try
//            {
                
//                VehicleServiceViewModel serviceModel = new VehicleServiceViewModel()
//                {
//                    VehicleId = 2,
//                    Compliant = "Test Compliant123",
//                    ServiceDate = DateTime.Now,
//                    Description = "Test Description",
//                    MiscCost = 100,
//                    SpareParts = new List<SparePartModel>()
//                                        {
//                                            new SparePartModel() { SparePartId = 1, Quantity = 10 },
//                                            new SparePartModel() { SparePartId = 2, Quantity = 4 },
//                                        }
//                };

//                FleetController vf = new FleetController();
//                var abc1 = vf.VehicleServiceSave(serviceModel);



//                ajax = new AjaxModel<string>() { Result = AjaxResult.Success, Model = "Success", Message = "" };
//            }
//            catch (Exception exp)
//            {
//                ajax = new AjaxModel<string>() { Result = AjaxResult.Exception, Model = "Error", Message = exp.Message };
//            }

//        }
        

//        public AjaxModel<string> TestSparePartModelListGetl()
//        {
//            AjaxModel<string> ajax = null;

//            try
//            {
//                List<SparePartModel> lstvtm = new FleetDomain().SparePartListGet();
//                int nCount = lstvtm.Count;
//            }
//            catch
//            {

//            }

//            return ajax;

//        }



//        public AjaxModel<string> Test1()
//        {
//            AjaxModel<string> ajax = null;

//            try
//            {
//                VehicleServiceViewModel vvm = new FleetDomain().VehicleServiceGet(1);
//            }
//            catch
//            {

//            }

//            return ajax;

//        }

        
//        public AjaxModel<string> Test6()
//        {
//            AjaxModel<string> ajax = null;

//            try
//            {
//                VehicleTypeModel vvm = new FleetDomain().VehicleTypeGet(1);
//            }
//            catch
//            {

//            }

//            return ajax;

//        }
        
//        public AjaxModel<string> Test2()
//        {
//            AjaxModel<string> ajax = null;

//            try
//            {
//                VehicleModel vvm = new VehicleModel();
//                vvm.RegistrationNumber = "AP28DB950";
//                vvm.VehicleId = 1;
//                vvm.VehicleTypeId = 1;

//                FleetController fc = new FleetController();
//                var abc1 = fc.VehicleSave(vvm);
                
//                ajax = new AjaxModel<string>() { Result = AjaxResult.Success, Model = "Success", Message = "" };
//            }
//            catch (Exception exp)
//            {
//                ajax = new AjaxModel<string>() { Result = AjaxResult.Exception, Model = "Error", Message = exp.Message };
//            }

//            return ajax;

//        }
        
//        public AjaxModel<string> Test3()
//        {
//            AjaxModel<string> ajax = null;

//            try
//            {
//                VehicleModel vvm = new FleetDomain().VehicleGet(1);

//                string strData = vvm.RegistrationNumber.ToString() + "  " + vvm.VehicleId.ToString();

//                ajax = new AjaxModel<string>() { Result = AjaxResult.Success, Model = strData, Message = strData };
//            }
//            catch (Exception exp)
//            {
//                ajax = new AjaxModel<string>() { Result = AjaxResult.Exception, Model = "Error", Message = exp.Message };
//            }

//            return ajax;

//        }
        
//        public AjaxModel<string> Test4()
//        {
//            AjaxModel<string> ajax = null;

//            try
//            {

//                VehicleDetailsModel vdm = new VehicleDetailsModel();
//                vdm.VehicleId = 2;
//                vdm.ServiceRecord = new List<VehicleServiceModel>();
//                //vdm.ServiceRecord.Add(new FleetDomain().VehicleServiceModelGet(1));
//                //vdm.ServiceRecord.Add(new FleetDomain().VehicleServiceModelGet(2));

//                // var abc1 = VehicleDetailsSave(vdm);

//                ajax = new AjaxModel<string>() { Result = AjaxResult.Success, Model = "Success", Message = "" };
//            }
//            catch (Exception exp)
//            {
//                ajax = new AjaxModel<string>() { Result = AjaxResult.Exception, Model = "Error", Message = exp.Message };
//            }

//            return ajax;



//        }
        
//        public AjaxModel<string> Test5()
//        {
//            AjaxModel<string> ajax;

//            try
//            {

//                //var abc = VehicleServiceGet(2);

//                VehicleServiceViewModel serviceModel = new VehicleServiceViewModel()
//                {
//                    VehicleId = 2,
//                    Compliant = "Test Compliant",
//                    ServiceDate = DateTime.Now,
//                    Description = "Test Description",
//                    MiscCost = 100,
//                    SpareParts = new List<SparePartModel>()
//                                        {
//                                            new SparePartModel() { SparePartId = 1, Quantity = 10 },
//                                            new SparePartModel() { SparePartId = 2, Quantity = 4 },
//                                        }
//                };

//                FleetController fc = new FleetController();

//                var abc1 =fc.VehicleServiceSave(serviceModel);



//                ajax = new AjaxModel<string>() { Result = AjaxResult.Success, Model = "Success", Message = "" };
//            }
//            catch (Exception exp)
//            {
//                ajax = new AjaxModel<string>() { Result = AjaxResult.Exception, Model = "Error", Message = exp.Message };
//            }

//            return ajax;
//        }

//    }



//}
