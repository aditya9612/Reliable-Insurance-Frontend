import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Plus, Trash2, Upload, Check, UserCheck } from 'lucide-react';

interface FamilyMember {
    id: number;
    name: string;
    relation: string;
    occupation: string;
    contactNo: string;
    designation: string;
}

interface ReferenceDetail {
    id: number;
    name: string;
    address: string;
    designation: string;
    contactNo: string;
    mailId: string;
}

interface PreviousCompany {
    id: number;
    companyName: string;
    companyAddress: string;
    companyMobileNo: string;
    previousQualification: string;
    doj: string;
    doe: string;
    previousExperience: string;
    hrName: string;
    hrMobileNo: string;
    hrMailId: string;
}

const EmployeeMasterTab: React.FC = () => {
    // 1. Employee Details Form States
    const [empCode, setEmpCode] = useState('77');
    const [organization, setOrganization] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [designation, setDesignation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fatherHusbandName, setFatherHusbandName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [emergencyMobileNo, setEmergencyMobileNo] = useState('');
    const [permanentAddress, setPermanentAddress] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [taluka, setTaluka] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [emailId, setEmailId] = useState('');
    const [qualification, setQualification] = useState('');
    const [doj, setDoj] = useState('');
    const [doe, setDoe] = useState('09/10/2026');
    const [currentExperience, setCurrentExperience] = useState('0');
    const [jobTitle, setJobTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [dob, setDob] = useState('');
    const [panNo, setPanNo] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [electionCardNo, setElectionCardNo] = useState('');
    const [drivingNo, setDrivingNo] = useState('');
    const [pfApplicable, setPfApplicable] = useState('NO');

    // 2. User Details
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [usernameStatus, setUsernameStatus] = useState<string | null>(null);

    // 3. Bank Details
    const [bankName, setBankName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [bankAccountNo, setBankAccountNo] = useState('');

    // 4. Family Member Details
    const [familyList, setFamilyList] = useState<FamilyMember[]>([]);
    const [famName, setFamName] = useState('');
    const [famRelation, setFamRelation] = useState('');
    const [famOccupation, setFamOccupation] = useState('');
    const [famContact, setFamContact] = useState('');
    const [famDesignation, setFamDesignation] = useState('');

    // 5. Reference Details
    const [referenceList, setReferenceList] = useState<ReferenceDetail[]>([]);
    const [refName, setRefName] = useState('');
    const [refAddress, setRefAddress] = useState('');
    const [refDesignation, setRefDesignation] = useState('');
    const [refContact, setRefContact] = useState('');
    const [refMailId, setRefMailId] = useState('');

    // 6. Previous Company Details
    const [previousList, setPreviousList] = useState<PreviousCompany[]>([]);
    const [prevCompany, setPrevCompany] = useState('');
    const [prevAddress, setPrevAddress] = useState('');
    const [prevMobile, setPrevMobile] = useState('');
    const [prevQual, setPrevQual] = useState('');
    const [prevDoj, setPrevDoj] = useState('');
    const [prevDoe, setPrevDoe] = useState('');
    const [prevExp, setPrevExp] = useState('');
    const [prevHrName, setPrevHrName] = useState('');
    const [prevHrMobile, setPrevHrMobile] = useState('');
    const [prevHrMail, setPrevHrMail] = useState('');

    // 7. Photo Upload
    const [photoFileName, setPhotoFileName] = useState<string>('');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Toast
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // Check Username Availability
    const handleCheckUsername = () => {
        if (!username.trim()) {
            showToast('Please enter a username to check', 'warning');
            return;
        }
        setUsernameStatus(`"${username.trim()}" is available!`);
        showToast(`Username "${username.trim()}" is available`, 'success');
    };

    // Add Family Member
    const handleAddFamily = () => {
        if (!famName.trim()) {
            showToast('Please enter Family Member Name', 'warning');
            return;
        }
        const newFam: FamilyMember = {
            id: Date.now(),
            name: famName.trim(),
            relation: famRelation.trim(),
            occupation: famOccupation.trim(),
            contactNo: famContact.trim(),
            designation: famDesignation.trim()
        };
        setFamilyList(prev => [...prev, newFam]);
        setFamName('');
        setFamRelation('');
        setFamOccupation('');
        setFamContact('');
        setFamDesignation('');
        showToast(`Added family member: ${newFam.name}`, 'success');
    };

    const handleRemoveFamily = (id: number) => {
        setFamilyList(prev => prev.filter(f => f.id !== id));
        showToast('Removed family member', 'warning');
    };

    // Add Reference
    const handleAddReference = () => {
        if (!refName.trim()) {
            showToast('Please enter Reference Name', 'warning');
            return;
        }
        const newRef: ReferenceDetail = {
            id: Date.now(),
            name: refName.trim(),
            address: refAddress.trim(),
            designation: refDesignation.trim(),
            contactNo: refContact.trim(),
            mailId: refMailId.trim()
        };
        setReferenceList(prev => [...prev, newRef]);
        setRefName('');
        setRefAddress('');
        setRefDesignation('');
        setRefContact('');
        setRefMailId('');
        showToast(`Added reference: ${newRef.name}`, 'success');
    };

    const handleRemoveReference = (id: number) => {
        setReferenceList(prev => prev.filter(r => r.id !== id));
        showToast('Removed reference', 'warning');
    };

    // Add Previous Company
    const handleAddPreviousCompany = () => {
        if (!prevCompany.trim()) {
            showToast('Please enter Company Name', 'warning');
            return;
        }
        const newPrev: PreviousCompany = {
            id: Date.now(),
            companyName: prevCompany.trim(),
            companyAddress: prevAddress.trim(),
            companyMobileNo: prevMobile.trim(),
            previousQualification: prevQual.trim(),
            doj: prevDoj.trim(),
            doe: prevDoe.trim(),
            previousExperience: prevExp.trim(),
            hrName: prevHrName.trim(),
            hrMobileNo: prevHrMobile.trim(),
            hrMailId: prevHrMail.trim()
        };
        setPreviousList(prev => [...prev, newPrev]);
        setPrevCompany('');
        setPrevAddress('');
        setPrevMobile('');
        setPrevQual('');
        setPrevDoj('');
        setPrevDoe('');
        setPrevExp('');
        setPrevHrName('');
        setPrevHrMobile('');
        setPrevHrMail('');
        showToast(`Added previous company: ${newPrev.companyName}`, 'success');
    };

    const handleRemovePreviousCompany = (id: number) => {
        setPreviousList(prev => prev.filter(p => p.id !== id));
        showToast('Removed previous company', 'warning');
    };

    // Handle Photo Change
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhotoFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            showToast(`Uploaded photo: ${file.name}`, 'success');
        }
    };

    // Form Reset
    const handleReset = () => {
        setEmpCode('77');
        setOrganization('');
        setDepartment('');
        setLocation('');
        setDesignation('');
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setFatherHusbandName('');
        setMobileNo('');
        setEmergencyMobileNo('');
        setPermanentAddress('');
        setCurrentAddress('');
        setState('');
        setDistrict('');
        setTaluka('');
        setPinCode('');
        setGender('');
        setBloodGroup('');
        setMaritalStatus('');
        setEmailId('');
        setQualification('');
        setDoj('');
        setDoe('09/10/2026');
        setCurrentExperience('0');
        setJobTitle('');
        setSalary('');
        setDob('');
        setPanNo('');
        setAadharNo('');
        setElectionCardNo('');
        setDrivingNo('');
        setPfApplicable('NO');

        setUsername('');
        setPassword('');
        setRePassword('');
        setUsernameStatus(null);

        setBankName('');
        setIfscCode('');
        setBankAccountNo('');

        setFamilyList([]);
        setReferenceList([]);
        setPreviousList([]);
        setPhotoFileName('');
        setPhotoPreview(null);

        showToast('Form reset to initial state', 'warning');
    };

    // Form Save
    const handleSave = () => {
        if (!empCode.trim()) {
            showToast('Please enter Emp Code', 'warning');
            return;
        }
        if (!firstName.trim() || !lastName.trim()) {
            showToast('Please enter First Name and Last Name', 'warning');
            return;
        }
        if (!mobileNo.trim()) {
            showToast('Please enter Mobile Number', 'warning');
            return;
        }
        if (password && password !== rePassword) {
            showToast('Passwords do not match', 'warning');
            return;
        }

        showToast(`Employee "${firstName} ${lastName}" (Code: ${empCode}) saved successfully!`, 'success');
    };

    return (
        <div className="tab-transition-wrapper space-y-6 w-full min-w-0 pb-12">
            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-2xl border text-white text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200 ${
                        toast.type === 'warning'
                            ? 'bg-[#1E293B] border-amber-500/40 text-amber-200'
                            : 'bg-[#0B203C] border-blue-500/40 text-blue-100'
                    }`}
                >
                    {toast.type === 'warning' ? (
                        <AlertCircle size={18} className="text-amber-400 shrink-0" />
                    ) : (
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    )}
                    <span>{toast.message}</span>
                </div>
            )}

            {/* ============================================================== */}
            {/* SECTION 1: » EMPLOYEE DETAILS                                  */}
            {/* ============================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                {/* Header Banner in Blue Theme */}
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Employee Details</span>
                    </div>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                    {/* Row 1: Emp Code, Organization, Department, Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Emp Code <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={empCode}
                                onChange={(e) => setEmpCode(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Organization <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Organization Name--</option>
                                <option value="JPB">JPB</option>
                                <option value="SHARVARI MARKETING">SHARVARI MARKETING</option>
                                <option value="SHARVARI MOTORS">SHARVARI MOTORS</option>
                                <option value="RELIABLE ASSOCIATES">RELIABLE ASSOCIATES</option>
                                <option value="RELIABLE INSURANCE BROKERS PVT LTD">RELIABLE INSURANCE BROKERS PVT LTD</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Department <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Department Name--</option>
                                <option value="BACK OFFICE">BACK OFFICE</option>
                                <option value="SALES">SALES</option>
                                <option value="OPERATION">OPERATION</option>
                                <option value="ACCOUNT">ACCOUNT</option>
                                <option value="IT">IT</option>
                                <option value="HR & ADMIN">HR & ADMIN</option>
                                <option value="UNDERWRITING">UNDERWRITING</option>
                                <option value="CLAIMS">CLAIMS</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Location <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Location Name--</option>
                                <option value="BARAMATI">BARAMATI</option>
                                <option value="PUNE">PUNE</option>
                                <option value="KOLHAPUR">KOLHAPUR</option>
                                <option value="SATARA">SATARA</option>
                                <option value="SOLAPUR">SOLAPUR</option>
                                <option value="SAMBHAJINAGAR">SAMBHAJINAGAR</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Designation, First Name, Middle Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Designation <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Designation Name--</option>
                                <option value="Branch Manager">Branch Manager</option>
                                <option value="Branch Admin">Branch Admin</option>
                                <option value="Senior Accountant">Senior Accountant</option>
                                <option value="Operations Head">Operations Head</option>
                                <option value="BDM Executive">BDM Executive</option>
                                <option value="Audit Officer">Audit Officer</option>
                                <option value="Field Executive">Field Executive</option>
                                <option value="Survey Coordinator">Survey Coordinator</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                First Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Middle Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 3: Last Name, Father/Husband Name, Mobile No, Emergency Mobile No */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Last Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Father/Husband Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={fatherHusbandName}
                                onChange={(e) => setFatherHusbandName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Mobile No <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="tel"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Emergency Mobile No <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="tel"
                                value={emergencyMobileNo}
                                onChange={(e) => setEmergencyMobileNo(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 4: Permanent Address, Current Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Permanent Address <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={permanentAddress}
                                onChange={(e) => setPermanentAddress(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Current Address <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={currentAddress}
                                onChange={(e) => setCurrentAddress(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 5: State, District, Taluka */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                State <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select State--</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Goa">Goa</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                District <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select District--</option>
                                <option value="Pune">Pune</option>
                                <option value="Satara">Satara</option>
                                <option value="Kolhapur">Kolhapur</option>
                                <option value="Solapur">Solapur</option>
                                <option value="Ahmednagar">Ahmednagar</option>
                                <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Taluka <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={taluka}
                                onChange={(e) => setTaluka(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 6: Pin code, Gender, Blood Group, Marital Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Pin code <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Gender <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">SELECT</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Blood Group
                            </label>
                            <select
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">SELECT</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Marital Status <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={maritalStatus}
                                onChange={(e) => setMaritalStatus(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 7: Email Id, Qualification, D.O.J, D.O.E */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Email Id <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Qualification <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                D.O.J <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={doj}
                                onChange={(e) => setDoj(e.target.value)}
                                placeholder="dd/MM/yyyy"
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                D.O.E <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={doe}
                                onChange={(e) => setDoe(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 border border-[#CBD5E1] rounded-full text-[13px] text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 8: Current Experience, Job Title, salary, D.O.B */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Current Exprience <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={currentExperience}
                                onChange={(e) => setCurrentExperience(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-50 border border-[#CBD5E1] rounded-full text-[13px] text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Job Title
                            </label>
                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                salary <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                D.O.B <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                placeholder="dd/MM/yyyy"
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 9: Pan No, Aadhar No, Election Card No, Driving No */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Pan No <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={panNo}
                                onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Aadhar No <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={aadharNo}
                                onChange={(e) => setAadharNo(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Election Card No
                            </label>
                            <input
                                type="text"
                                value={electionCardNo}
                                onChange={(e) => setElectionCardNo(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Driving No
                            </label>
                            <input
                                type="text"
                                value={drivingNo}
                                onChange={(e) => setDrivingNo(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 10: PF Applicable */}
                    <div className="w-full sm:w-1/4">
                        <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                            PF Applicable <span className="text-rose-500">*</span>
                        </label>
                        <select
                            value={pfApplicable}
                            onChange={(e) => setPfApplicable(e.target.value)}
                            className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                        >
                            <option value="NO">NO</option>
                            <option value="YES">YES</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* SECTION 2: » USER DETAILS                                      */}
            {/* ============================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>User Details</span>
                    </div>
                </div>

                <div className="p-6 sm:p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
                        {/* Username + Check Button */}
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Username
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={handleCheckUsername}
                                    className="px-4 py-2 bg-[#38BDF8] hover:bg-[#0284C7] text-white text-xs font-bold rounded-[6px] transition-all cursor-pointer border-none shadow-xs shrink-0"
                                >
                                    Check
                                </button>
                            </div>
                            {usernameStatus && (
                                <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                                    <Check size={13} /> {usernameStatus}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        {/* Re-Password */}
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Re-Password
                            </label>
                            <input
                                type="password"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* SECTION 3: » BANK DETAILS                                      */}
            {/* ============================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Bank Details</span>
                    </div>
                </div>

                <div className="p-6 sm:p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Bank Name <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                className="w-full px-3.5 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Bank Type--</option>
                                <option value="STATE BANK OF INDIA">STATE BANK OF INDIA</option>
                                <option value="HDFC BANK">HDFC BANK</option>
                                <option value="ICICI BANK">ICICI BANK</option>
                                <option value="AXIS BANK">AXIS BANK</option>
                                <option value="BANK OF MAHARASHTRA">BANK OF MAHARASHTRA</option>
                                <option value="CANARA BANK">CANARA BANK</option>
                                <option value="BARAMATI SAHAKARI BANK">BARAMATI SAHAKARI BANK</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                IFSC Code <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={ifscCode}
                                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
                                Bank Account No <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={bankAccountNo}
                                onChange={(e) => setBankAccountNo(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* SECTION 4: » FAMILY MEMBER DETAILS                             */}
            {/* ============================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Family Member Details</span>
                    </div>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                    {/* Input Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Name</label>
                            <input
                                type="text"
                                value={famName}
                                onChange={(e) => setFamName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Relation</label>
                            <input
                                type="text"
                                value={famRelation}
                                onChange={(e) => setFamRelation(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Occupation</label>
                            <input
                                type="text"
                                value={famOccupation}
                                onChange={(e) => setFamOccupation(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Contact No</label>
                            <input
                                type="tel"
                                value={famContact}
                                onChange={(e) => setFamContact(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Input Row 2 with Add Button */}
                    <div className="flex flex-col sm:flex-row items-end gap-5">
                        <div className="w-full sm:w-1/4">
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Designation</label>
                            <input
                                type="text"
                                value={famDesignation}
                                onChange={(e) => setFamDesignation(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddFamily}
                            className="px-8 py-2 bg-[#004b93] hover:bg-[#003870] text-white font-bold text-[13px] rounded-[6px] shadow-sm transition-all cursor-pointer border-none min-w-[90px] text-center"
                        >
                            Add
                        </button>
                    </div>

                    {/* Items table or NO ITEMS ADDED box */}
                    {familyList.length === 0 ? (
                        <div className="w-full py-2.5 px-4 bg-slate-100/80 border border-slate-200 text-slate-600 font-semibold text-xs rounded tracking-wider">
                            NO ITEMS ADDED
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-brand-primary text-white font-bold uppercase">
                                        <th className="py-2.5 px-4">Name</th>
                                        <th className="py-2.5 px-4">Relation</th>
                                        <th className="py-2.5 px-4">Occupation</th>
                                        <th className="py-2.5 px-4">Contact</th>
                                        <th className="py-2.5 px-4">Designation</th>
                                        <th className="py-2.5 px-4 text-center w-16">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {familyList.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="py-2 px-4 font-medium text-slate-800">{item.name}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.relation || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.occupation || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.contactNo || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.designation || '—'}</td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFamily(item.id)}
                                                    className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer border-none bg-transparent"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* ============================================================== */}
            {/* SECTION 5: » REFERENCE DETAILS                                 */}
            {/* ============================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Reference Details</span>
                    </div>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                    {/* Input Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Name</label>
                            <input
                                type="text"
                                value={refName}
                                onChange={(e) => setRefName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Address</label>
                            <input
                                type="text"
                                value={refAddress}
                                onChange={(e) => setRefAddress(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Designation</label>
                            <input
                                type="text"
                                value={refDesignation}
                                onChange={(e) => setRefDesignation(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Contact No</label>
                            <input
                                type="tel"
                                value={refContact}
                                onChange={(e) => setRefContact(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Input Row 2 with Add Button */}
                    <div className="flex flex-col sm:flex-row items-end gap-5">
                        <div className="w-full sm:w-1/4">
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Mail Id</label>
                            <input
                                type="email"
                                value={refMailId}
                                onChange={(e) => setRefMailId(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleAddReference}
                            className="px-8 py-2 bg-[#004b93] hover:bg-[#003870] text-white font-bold text-[13px] rounded-[6px] shadow-sm transition-all cursor-pointer border-none min-w-[90px] text-center"
                        >
                            Add
                        </button>
                    </div>

                    {/* Items table or NO ITEMS ADDED box */}
                    {referenceList.length === 0 ? (
                        <div className="w-full py-2.5 px-4 bg-slate-100/80 border border-slate-200 text-slate-600 font-semibold text-xs rounded tracking-wider">
                            NO ITEMS ADDED
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-brand-primary text-white font-bold uppercase">
                                        <th className="py-2.5 px-4">Name</th>
                                        <th className="py-2.5 px-4">Address</th>
                                        <th className="py-2.5 px-4">Designation</th>
                                        <th className="py-2.5 px-4">Contact</th>
                                        <th className="py-2.5 px-4">Email</th>
                                        <th className="py-2.5 px-4 text-center w-16">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {referenceList.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="py-2 px-4 font-medium text-slate-800">{item.name}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.address || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.designation || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.contactNo || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.mailId || '—'}</td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveReference(item.id)}
                                                    className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer border-none bg-transparent"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* ============================================================== */}
            {/* SECTION 6: » PREVIOUS COMPANY DETAILS                          */}
            {/* ============================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Previous Company Details</span>
                    </div>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Company Name</label>
                            <input
                                type="text"
                                value={prevCompany}
                                onChange={(e) => setPrevCompany(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Company Address</label>
                            <input
                                type="text"
                                value={prevAddress}
                                onChange={(e) => setPrevAddress(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Company Mobile No</label>
                            <input
                                type="tel"
                                value={prevMobile}
                                onChange={(e) => setPrevMobile(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Previous Qualification</label>
                            <input
                                type="text"
                                value={prevQual}
                                onChange={(e) => setPrevQual(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">D.O.J</label>
                            <input
                                type="text"
                                value={prevDoj}
                                onChange={(e) => setPrevDoj(e.target.value)}
                                placeholder="dd/MM/yyyy"
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">D.O.E</label>
                            <input
                                type="text"
                                value={prevDoe}
                                onChange={(e) => setPrevDoe(e.target.value)}
                                placeholder="dd/MM/yyyy"
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">Previous Exprience</label>
                            <input
                                type="text"
                                value={prevExp}
                                onChange={(e) => setPrevExp(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">HR Name</label>
                            <input
                                type="text"
                                value={prevHrName}
                                onChange={(e) => setPrevHrName(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Row 3 with Add Button */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">HR Mobile No</label>
                            <input
                                type="tel"
                                value={prevHrMobile}
                                onChange={(e) => setPrevHrMobile(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-slate-700 mb-1.5">HR Mail Id</label>
                            <input
                                type="email"
                                value={prevHrMail}
                                onChange={(e) => setPrevHrMail(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={handleAddPreviousCompany}
                                className="px-8 py-2 bg-[#004b93] hover:bg-[#003870] text-white font-bold text-[13px] rounded-[6px] shadow-sm transition-all cursor-pointer border-none min-w-[90px] text-center"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Items table or NO ITEMS ADDED box */}
                    {previousList.length === 0 ? (
                        <div className="w-full py-2.5 px-4 bg-slate-100/80 border border-slate-200 text-slate-600 font-semibold text-xs rounded tracking-wider">
                            NO ITEMS ADDED
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-brand-primary text-white font-bold uppercase">
                                        <th className="py-2.5 px-4">Company Name</th>
                                        <th className="py-2.5 px-4">Address</th>
                                        <th className="py-2.5 px-4">DOJ - DOE</th>
                                        <th className="py-2.5 px-4">Experience</th>
                                        <th className="py-2.5 px-4">HR Contact</th>
                                        <th className="py-2.5 px-4 text-center w-16">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {previousList.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="py-2 px-4 font-medium text-slate-800">{item.companyName}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.companyAddress || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.doj} to {item.doe}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.previousExperience || '—'}</td>
                                            <td className="py-2 px-4 text-slate-600">{item.hrName} ({item.hrMobileNo || item.hrMailId || '—'})</td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePreviousCompany(item.id)}
                                                    className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer border-none bg-transparent"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* ============================================================== */}
            {/* SECTION 7: » EMPLOYEE PHOTO UPLOAD                             */}
            {/* ============================================================== */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Employee Photo Upload</span>
                    </div>
                </div>

                <div className="p-6 sm:p-7">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs cursor-pointer transition-colors">
                            <Upload size={15} />
                            <span>Choose Files</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </label>
                        <span className="text-xs text-slate-500 font-medium">
                            {photoFileName || 'No file chosen'}
                        </span>
                        {photoPreview && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shadow-2xs shrink-0">
                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* BOTTOM ACTIONS: SAVE & RESET                                   */}
            {/* ============================================================== */}
            <div className="flex items-center justify-center gap-4 pt-3">
                <button
                    type="button"
                    onClick={handleSave}
                    className="px-10 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[110px] text-center"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="px-10 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[110px] text-center"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default EmployeeMasterTab;
