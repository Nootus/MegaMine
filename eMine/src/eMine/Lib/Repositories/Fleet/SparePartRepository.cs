using eMine.Lib.Entities;
using eMine.Lib.Entities.Fleet;
using eMine.Models.Fleet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Repositories.Fleet
{
    public class SparePartRepository : BaseRepository
    {
        public SparePartRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //SparePartManufacturer
        public List<ListItem<int, string>> SparePartManufacturerListItemGet()
        {
            var query = from spm in dbContext.SparePartManufacturers
                        where spm.DeletedInd == false
                        orderby spm.SparePartManufacturerId ascending
                        select new ListItem<int, string>()
                        {
                            Key = spm.SparePartManufacturerId,
                            Item = spm.VehicleModelId.ToString()
                        };

            return query.ToList();
        }

        public SparePartManufacturerModel SparePartManufacturerGet(int SparePartManufacturerId)
        {

            var query = from spm in dbContext.SparePartManufacturers
                        where spm.SparePartManufacturerId == SparePartManufacturerId
                        && spm.DeletedInd == false
                        select new SparePartManufacturerModel
                        {
                            SparePartManufacturerId = spm.SparePartManufacturerId,
                            VehicleManufacturerId = spm.VehicleManufacturerId,
                            VehicleModelId = spm.VehicleModelId
                        };


            SparePartManufacturerModel model = query.FirstOrDefault();

            return model;
        }

        public void SparePartManufacturerAdd(SparePartManufacturerModel model)
        {
            SparePartManufacturerEntity entity = new SparePartManufacturerEntity()
            {
                SparePartManufacturerId = model.SparePartManufacturerId,
                SparePartId = model.SparePartId,
                VehicleManufacturerId = model.VehicleManufacturerId,
                VehicleModelId = model.VehicleModelId,
                VehicleTypeId = model.VehicleTypeId
            };
            dbContext.SparePartManufacturers.Add(entity);
            dbContext.SaveChanges();

        }

        public void SparePartManufacturerUpdate(SparePartManufacturerModel model)
        {
            //Update the SparePartManufacturerModel Entity first
            SparePartManufacturerEntity entity = (from spm in dbContext.SparePartManufacturers where spm.SparePartManufacturerId == model.SparePartManufacturerId select spm).First();
            entity.SparePartManufacturerId = model.SparePartManufacturerId;
            entity.SparePartId = model.SparePartId;
            entity.VehicleManufacturerId = model.VehicleManufacturerId;
            entity.VehicleModelId = model.VehicleModelId;
            entity.VehicleTypeId = model.VehicleTypeId;
            entity.UpdateAuditFields();
            dbContext.SparePartManufacturers.Update(entity);
            dbContext.SaveChanges();

        }

        public void SparePartManufacturerModelSave(SparePartManufacturerModel model)
        {
            if (model.SparePartManufacturerId == 0)
            {
                SparePartManufacturerAdd(model);
            }
            else
            {
                SparePartManufacturerUpdate(model);
            }
        }

        public SparePartOrderModel SparePartOrderGet(int sparePartOrderId)
        {
            SparePartOrderModel model = null;
            if (sparePartOrderId == 0)
            {
                model = new SparePartOrderModel();
                model.SparePartOrderId = sparePartOrderId;
                model.SparePartId = 0;
                model.OrderedUnits = 0;
                model.UnitCost = 0;
                model.OrderedUTCdatetime = null;
                model.DeliveredUTCdatetime = null;
                model.FollowupEmailAddress = "";
                model.FollowupPhoneNum = "";
            }
            else
            {
                var query = from order in dbContext.SparePartOrders
                            where order.SparePartOrderId == sparePartOrderId
                            && order.DeletedInd == false
                            select new SparePartOrderModel
                            {
                                SparePartOrderId = order.SparePartOrderId,
                                SparePartId = order.SparePartId,
                                OrderedUnits = order.OrderedUnits,
                                UnitCost = order.UnitCost,
                                OrderedUTCdatetime = order.OrderedUTCdatetime,
                                DeliveredUTCdatetime = order.DeliveredUTCdatetime,
                                FollowupEmailAddress = order.FollowupEmailAddress,
                                FollowupPhoneNum = order.FollowupPhoneNum
                            };

                model = query.FirstOrDefault();
            }

            return model;
        }

        public void SparePartOrderAdd(SparePartOrderModel model)
        {
            SparePartOrderEntity entity = new SparePartOrderEntity()
            {
                SparePartId = model.SparePartId,
                OrderedUnits = model.OrderedUnits,
                UnitCost = model.UnitCost,
                OrderedUTCdatetime = model.OrderedUTCdatetime,
                DeliveredUTCdatetime = model.DeliveredUTCdatetime,
                FollowupEmailAddress = model.FollowupEmailAddress,
                FollowupPhoneNum = model.FollowupPhoneNum
            };
            dbContext.SparePartOrders.Add(entity);

            //Get the newly added 

            SparePartEntity result = (from part in dbContext.SpareParts
                                      where part.SparePartId == model.SparePartId
                                      && part.DeletedInd == false
                                      select part).SingleOrDefault();

            result.AvailableQuantity += model.OrderedUnits;

            dbContext.SaveChanges();

        }

        public void SparePartOrderUpdate(SparePartOrderModel model)
        {
            //Update the VehicleService Entity first
            SparePartOrderEntity entity = (from order in dbContext.SparePartOrders where order.SparePartOrderId == model.SparePartOrderId select order).First();
            entity.SparePartId = model.SparePartId;
            entity.OrderedUnits = model.OrderedUnits;
            entity.UnitCost = model.UnitCost;
            entity.OrderedUTCdatetime = model.OrderedUTCdatetime;
            entity.DeliveredUTCdatetime = model.DeliveredUTCdatetime;
            entity.FollowupEmailAddress = model.FollowupEmailAddress;
            entity.FollowupPhoneNum = model.FollowupPhoneNum;
            entity.UpdateAuditFields();
            dbContext.SparePartOrders.Update(entity);
            dbContext.SaveChanges();

        }

        public void SparePartOrderSave(SparePartOrderModel model)
        {
            if (model.SparePartOrderId == 0)
            {
                SparePartOrderAdd(model);
            }
            else
            {
                SparePartOrderUpdate(model);
            }
        }

        public void SparePartUpdate(SparePartModel model)
        {
            SparePartEntity entity = (from spart in dbContext.SpareParts where spart.SparePartId == model.SparePartId select spart).First();

            entity.SparePartId = model.SparePartId;
            entity.AvailableQuantity = model.Quantity;
            entity.SparePartName = model.Name;
            entity.ManufacturingBrand = model.ManufacturingBrand;
            entity.SparePartDescription = model.Description;
            entity.UpdateAuditFields();

            SparePartManufacturerEntity spamen = (from spam in dbContext.SparePartManufacturers where spam.SparePartId == model.SparePartId select spam ).FirstOrDefault();

            if (model.VehicleTypeId != 0 || model.VehicleManufacturerId != 0 || model.VehicleModelId != 0)
            {
                if(spamen == null)
                {
                    SparePartManufacturerEntity spam = new SparePartManufacturerEntity();
                    spam.SparePartId = model.SparePartId;
                    spam.VehicleModelId = model.VehicleModelId;
                    spam.VehicleTypeId = model.VehicleTypeId;
                    spam.VehicleManufacturerId = model.VehicleManufacturerId;
                    dbContext.SparePartManufacturers.Add(spam);
                }
                else
                {
                    spamen.VehicleModelId = model.VehicleModelId;
                    spamen.VehicleTypeId = model.VehicleTypeId;
                    spamen.VehicleManufacturerId = model.VehicleManufacturerId;
                    spamen.DeletedInd = false;
                    dbContext.SparePartManufacturers.Update(spamen);
                }               
            }
            else
            {
                    spamen.DeletedInd = false;
                    dbContext.SparePartManufacturers.Update(spamen);
            }

            dbContext.SpareParts.Update(entity);
            dbContext.SaveChanges();
        }

        public void SparePartAdd(SparePartModel model)
        {
            SparePartEntity entity = new SparePartEntity()
            {
                SparePartId = model.SparePartId,
                AvailableQuantity = model.Quantity,
                SparePartName = model.Name,
                ManufacturingBrand = model.ManufacturingBrand,
                SparePartDescription = model.Description
            };


            dbContext.SpareParts.Add(entity);
            dbContext.SaveChanges();
            model.SparePartId = entity.SparePartId;

            if (model.VehicleTypeId != 0 || model.VehicleManufacturerId != 0 || model.VehicleModelId != 0)
            {
                SparePartManufacturerEntity spam = new SparePartManufacturerEntity();
                spam.SparePartId = model.SparePartId;
                spam.VehicleModelId = model.VehicleModelId;
                spam.VehicleTypeId = model.VehicleTypeId;
                spam.VehicleManufacturerId = model.VehicleManufacturerId;
                dbContext.SparePartManufacturers.Add(spam);
                dbContext.SaveChanges();
            }          

        }

        public void SparePartSave(SparePartModel model)
        {
            if (model.SparePartId == 0)
            {
                SparePartAdd(model);
            }
            else
            {
                SparePartUpdate(model);
            }
        }

        public SparePartModel SparePartGet(int SparePartId, VehicleRepository vehicleRepository)
        {
            SparePartModel model = null;
            if (SparePartId == 0)
            {
                model = new SparePartModel();
                model.SparePartId = 0;
                model.Quantity = 0;
                model.Name = "";
                model.ManufacturingBrand = "";
                model.Description = "";
                model.VehicleModelId = 0;
                model.VehicleTypeId = 0;
                model.VehicleManufacturerId = 0;
            }
            else
            {
                var sparePartGetQuery = from sPart in dbContext.SpareParts
                                        where sPart.SparePartId == SparePartId
                                        && sPart.DeletedInd == false
                                        select new SparePartModel
                                        {
                                            SparePartId = sPart.SparePartId,
                                            Quantity = sPart.AvailableQuantity,
                                            Name = sPart.SparePartName,
                                            ManufacturingBrand = sPart.ManufacturingBrand,
                                            Description = sPart.SparePartDescription
                                        };

                model = sparePartGetQuery.FirstOrDefault();

                SparePartManufacturerEntity spamen = (from spam in dbContext.SparePartManufacturers where spam.SparePartId == model.SparePartId select spam).FirstOrDefault();

                if (spamen != null)
                {
                    model.VehicleModelId = spamen.VehicleModelId;
                    model.VehicleTypeId = spamen.VehicleTypeId;
                    model.VehicleManufacturerId = spamen.VehicleManufacturerId;
                }
                else
                {
                    model.VehicleModelId = 0;
                    model.VehicleTypeId = 0;
                    model.VehicleManufacturerId = 0;
                }

            }

            model.VehicleTypeList = vehicleRepository.VehicleTypeListItemGet();
            model.ManufacturerList = vehicleRepository.VehicleManufacturerListItemGet();
            model.VehicleModelList = vehicleRepository.VehicleManufactureModelGet();

            return model;
        }

        public SparePartDetailsModel SparePartDetailsGet(int sparePartId, VehicleRepository vehicleRepository)
        {
            var sparePartGetQuery = from sPart in dbContext.SpareParts
                                    where sPart.SparePartId == sparePartId
                                    && sPart.DeletedInd == false
                                    select new SparePartDetailsModel
                                    {
                                        SparePartId = sPart.SparePartId,
                                        Quantity = sPart.AvailableQuantity,
                                        Name = sPart.SparePartName,
                                        ManufacturingBrand = sPart.ManufacturingBrand,
                                        Description = sPart.SparePartDescription
                                    };

            SparePartDetailsModel model = sparePartGetQuery.FirstOrDefault();

            SparePartManufacturerEntity spamen = (from spam in dbContext.SparePartManufacturers where spam.SparePartId == model.SparePartId select spam).FirstOrDefault();

            if (spamen != null)
            {
                var modelQuery = (from models in dbContext.VehicleModels
                                  where models.VehicleModelId == spamen.VehicleModelId
                                  && models.DeletedInd == false
                                  select models.Description).SingleOrDefault();

                model.VehicleModel = modelQuery.ToString();

                var typeQuery = (from types in dbContext.VehicleTypes
                                  where types.VehicleTypeId == spamen.VehicleTypeId
                                  && types.DeletedInd == false
                                  select types.VehicleTypeName).SingleOrDefault();

                model.VehicleType = typeQuery.ToString();


                var manfQuery = (from manufacturers in dbContext.VehicleManufacturers
                                 where manufacturers.VehicleManufacturerId == spamen.VehicleTypeId
                                 && manufacturers.DeletedInd == false
                                 select manufacturers.Description).SingleOrDefault();

                model.VehicleManufacturer = manfQuery.ToString();

                //model.VehicleManufacturer = spamen.VehicleManufacturerId;
            }
            else
            {
                model.VehicleModel = "";
                model.VehicleType = "";
                model.VehicleManufacturer = "";
            }


            var ordersQuery = from order in dbContext.SparePartOrders
                              where order.SparePartId == sparePartId
                              && order.DeletedInd == false
                              select new SparePartOrderModel
                              {
                                  SparePartOrderId = order.SparePartOrderId,
                                  SparePartId = order.SparePartId,
                                  OrderedUnits = order.OrderedUnits,
                                  UnitCost = order.UnitCost,
                                  OrderedUTCdatetime = order.OrderedUTCdatetime,
                                  DeliveredUTCdatetime = order.DeliveredUTCdatetime,
                                  FollowupEmailAddress = order.FollowupEmailAddress,
                                  FollowupPhoneNum = order.FollowupPhoneNum
                              };

            model.Orders = ordersQuery.ToList();

            return model;

        }


        public List<SparePartModel> SparePartListGet()
        {
            var query = from parts in dbContext.SpareParts
                        where parts.DeletedInd == false
                        orderby parts.SparePartName ascending
                        select new SparePartModel
                        {
                            SparePartId = parts.SparePartId,
                            Quantity = parts.AvailableQuantity,
                            Name = parts.SparePartName,
                            ManufacturingBrand = parts.ManufacturingBrand,
                            Description = parts.SparePartDescription,
                        };

            return query.ToList();
        }


        public List<ListItem<int, string>> SparePartListItemGet()
        {
            var query = from parts in dbContext.SpareParts
                        where parts.DeletedInd == false
                        orderby parts.SparePartName ascending
                        select new ListItem<int, string>()
                        {
                            Key = parts.SparePartId,
                            Item = parts.SparePartName
                        };

            return query.ToList();
        }


        //RamPras algorithm to get the total cost
        public decimal GetSparePartsCost(SparePartModel spvm, int totalparts, bool bUpdate = false)
        {
            decimal totalcost = 0;

            int totalAvailable = 0;

            var partorderquery = (from order in dbContext.SparePartOrders
                                  where order.SparePartId == spvm.SparePartId && order.OrderedUnits > order.ConsumedUnits
                                  && order.DeletedInd == false
                                  orderby order.DeliveredUTCdatetime ascending
                                  select order).ToList();

            foreach (SparePartOrderEntity order in partorderquery) { totalAvailable += order.OrderedUnits - order.ConsumedUnits; }

            // Do not proceed with Save if there are no parts.
            if (totalAvailable < totalparts) return totalAvailable - totalparts;



            //Get the price and update the consumed units 
            int totalNeeded = totalparts;
            foreach (SparePartOrderEntity order in partorderquery)
            {
                if (totalNeeded < order.OrderedUnits - order.ConsumedUnits)
                {
                    totalcost = totalcost + (order.UnitCost * totalNeeded);
                    if (bUpdate)
                    {
                        order.ConsumedUnits = totalNeeded;
                        dbContext.SparePartOrders.Update(order);
                    }
                    break;
                }

                totalNeeded -= order.OrderedUnits - order.ConsumedUnits;
                totalcost = totalcost + (order.UnitCost * (order.OrderedUnits - order.ConsumedUnits));
                if (bUpdate)
                {
                    order.ConsumedUnits = order.OrderedUnits;
                    dbContext.SparePartOrders.Update(order);
                }
            }

            return totalcost;
        }

        //Create the VehicleService and SparePartOrders link table
        public void CreateVehicleServiceSparePartOrdersLink(SparePartModel spvm, VehicleServiceViewModel model, int totalparts)
        {
            var partorderquery = (from order in dbContext.SparePartOrders
                                  where order.SparePartId == spvm.SparePartId && order.OrderedUnits > order.ConsumedUnits
                                  && order.DeletedInd == false
                                  orderby order.DeliveredUTCdatetime ascending
                                  select order).ToList();

            int totalneeded = totalparts;

            foreach (SparePartOrderEntity order in partorderquery)
            {
                int nAvailableOrderItems = order.OrderedUnits - order.ConsumedUnits;

                int nConsumedOrderItems = (totalneeded < nAvailableOrderItems) ? totalneeded : nAvailableOrderItems;

                totalneeded = totalneeded - nConsumedOrderItems;

                VehicleServiceSparePartOrderEntity servicePartOrder = new VehicleServiceSparePartOrderEntity()
                {
                    SparePartOrderId = order.SparePartOrderId,
                    ConsumedUnits = nConsumedOrderItems,
                    VehicleServiceId = model.VehicleServiceId
                };

                dbContext.VehicleServiceSparePartOrders.Add(servicePartOrder);

                if (totalneeded == nConsumedOrderItems)
                {
                    break;
                }
            }
        }
    }
}
