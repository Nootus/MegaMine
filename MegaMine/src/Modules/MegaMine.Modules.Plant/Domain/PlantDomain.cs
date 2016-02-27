using MegaMine.Modules.Plant.Models;
using MegaMine.Modules.Plant.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Domain
{
    public class PlantDomain
    {
        private PlantRepository plantRepository;
        public PlantDomain(PlantRepository plantRepository)
        {
            this.plantRepository = plantRepository;
        }

        #region Machine
        //Machine
        public async Task<List<MachineModel>> MachinesGet()
        {
            return await plantRepository.MachinesGet();
        }

        public async Task MachineSave(MachineModel model)
        {
            await plantRepository.MachineSave(model);
        }
        public async Task MachineDelete(int machineId)
        {
            await plantRepository.MachineDelete(machineId);
        }
        #endregion
    }
}
