using MegaMine.Modules.Quarry.Tests.Controller;
using System;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Tests
{
    public class Program
    {
        public static void Main(string[] args)
        {
            RunTest().Wait(); ;
            Console.WriteLine("Press a key to terminate");
            Console.ReadKey();
        }

        public static async Task RunTest()
        {
            QuarryControllerTest tst = new QuarryControllerTest();
            await tst.Test1();
        }
    }
}
