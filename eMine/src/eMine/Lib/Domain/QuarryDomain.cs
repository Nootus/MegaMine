using eMine.Lib.Repositories;
using eMine.Models.Quarry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Domain
{
    public class QuarryDomain
    {
        private QuarryRepository quarryRepository;
        public QuarryDomain(QuarryRepository quarryRepository)
        {
            this.quarryRepository = quarryRepository;
        }

        public async Task<List<MaterialColourModel>> MaterialColoursGet()
        {
            return await quarryRepository.MaterialColoursGet();
        }

        public async Task MaterialColourSave(MaterialColourModel model)
        {
            await quarryRepository.MaterialColourSave(model);
        }

    }
}
