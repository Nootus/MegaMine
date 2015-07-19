using eMine.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public static class Profile
    {
        public static ProfileModel Current
        {
            get
            {
                return (ProfileModel)HttpHelper.HttpContext?.Items[Constants.ProfileString];
            }
        }

        public static void SetCurrent(ProfileModel profile)
        {
            HttpHelper.HttpContext.Items[Constants.ProfileString] = profile;
        }
    }
}
