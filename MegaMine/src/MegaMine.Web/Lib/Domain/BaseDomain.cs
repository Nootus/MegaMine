using eMine.Lib.Shared;
using eMine.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Domain
{
    public class BaseDomain
    {
        protected ProfileModel profile;

        public BaseDomain()
        {
            profile = Profile.Current;
        }
    }
}
